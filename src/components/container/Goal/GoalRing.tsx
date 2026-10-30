import React, { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';

export interface GoalRingProps {
    segmentCount: number;
    filledCount: number;
    filledColor: string;
    unfilledColor: string;
    innerRadius: number;
    outerRadius: number;
    animate: boolean;
    animateNewSegments?: boolean;
}

export interface GoalRingSegment {
    startAngle: number;
    endAngle: number;
}

const startAngle = 450;
const paddingAngle = 5;
const sweepDuration = 500;
const segmentFillDuration = 700;
const segmentFillStagger = 200;
const maxSegmentFillStaggerTotal = 1000;

// Angles are in degrees, counterclockwise from 3 o'clock, so decreasing angles run clockwise from 12 o'clock.
export function computeSegmentSizes(count: number): number[] {
    const segmentSize = (360 - count * paddingAngle) / count;
    return Array(count).fill(-segmentSize);
}

export function layOutSegments(sizes: number[], previousSizes: number[] | undefined, progress: number): GoalRingSegment[] {
    const segments: GoalRingSegment[] = [];
    let angle = startAngle;
    sizes.forEach((size, index) => {
        const padding = index > 0 ? -paddingAngle : 0;
        const fromSize = previousSizes?.[index] ?? 0;
        const segment = { startAngle: angle + padding, endAngle: angle + fromSize + (size - fromSize) * progress + padding };
        segments.push(segment);
        angle = segment.endAngle;
    });
    return segments;
}

function polarToCartesian(center: number, radius: number, angle: number): string {
    const radians = -angle * Math.PI / 180;
    return `${center + Math.cos(radians) * radius},${center + Math.sin(radians) * radius}`;
}

export function getSegmentPath(segment: GoalRingSegment, innerRadius: number, outerRadius: number, center: number): string {
    // A sweep of exactly 360 degrees would start and end on the same point, which SVG draws as nothing.
    const sweep = Math.sign(segment.endAngle - segment.startAngle) * Math.min(Math.abs(segment.endAngle - segment.startAngle), 359.999);
    const endAngle = segment.startAngle + sweep;
    const largeArc = +(Math.abs(sweep) > 180);
    const clockwise = +(segment.startAngle > endAngle);
    return `M ${polarToCartesian(center, outerRadius, segment.startAngle)} `
        + `A ${outerRadius},${outerRadius},0,${largeArc},${clockwise},${polarToCartesian(center, outerRadius, endAngle)} `
        + `L ${polarToCartesian(center, innerRadius, endAngle)} `
        + `A ${innerRadius},${innerRadius},0,${largeArc},${1 - clockwise},${polarToCartesian(center, innerRadius, segment.startAngle)} Z`;
}

// Matches the Newton's method solver recharts uses for its default 'ease' timing, including its early exit.
export function ease(time: number): number {
    const x1 = 0.25, y1 = 0.1, x2 = 0.25, y2 = 1;
    const curve = (c1: number, c2: number, t: number) => 3 * c1 * t + (3 * c2 - 6 * c1) * t * t + (3 * c1 - 3 * c2 + 1) * t * t * t;
    const derivative = (c1: number, c2: number, t: number) => 3 * c1 + 2 * (3 * c2 - 6 * c1) * t + 3 * (3 * c1 - 3 * c2 + 1) * t * t;
    const target = Math.min(time, 1);
    let x = target;
    for (let i = 0; i < 8; ++i) {
        const error = curve(x1, x2, x) - target;
        const slope = derivative(x1, x2, x);
        if (Math.abs(error - target) < 1e-4 || slope < 1e-4) {
            return curve(y1, y2, x);
        }
        x = Math.max(0, Math.min(1, x - error / slope));
    }
    return curve(y1, y2, x);
}

// Overshoots past 1 before settling, which the fill shows as a brief swell in ring thickness.
export function springEase(time: number): number {
    const overshoot = 1.9;
    const t = Math.min(Math.max(time, 0), 1) - 1;
    return 1 + (overshoot + 1) * t * t * t + overshoot * t * t;
}

export function getSegmentFillProgress(fill: SegmentFill, index: number): number {
    const time = (fill.elapsed - (index - fill.fromCount) * fill.stagger) / segmentFillDuration;
    return time <= 0 ? 0 : springEase(time);
}

export function prefersReducedMotion(): boolean {
    return !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function getSegmentFillStagger(newSegmentCount: number): number {
    return Math.min(segmentFillStagger, maxSegmentFillStaggerTotal / newSegmentCount);
}

export function getRingAnimationDuration(newSegmentCount: number, animateNewSegments: boolean | undefined): number {
    if (!animateNewSegments) return sweepDuration;
    if (newSegmentCount <= 0) return 0;
    return (newSegmentCount - 1) * getSegmentFillStagger(newSegmentCount) + segmentFillDuration;
}

interface RingSweep {
    previousSizes: number[];
    progress: number;
}

export interface SegmentFill {
    fromCount: number;
    stagger: number;
    elapsed: number;
}

export default function GoalRing(props: GoalRingProps) {
    const sizes = computeSegmentSizes(props.segmentCount);

    const [rendered, setRendered] = useState<{ animate: boolean, sizes: number[], filledCount: number }>({ animate: !props.animate, sizes: [], filledCount: props.filledCount });
    const [sweep, setSweep] = useState<RingSweep>();
    const [fill, setFill] = useState<SegmentFill>();

    if (rendered.animate !== props.animate || !isEqual(rendered.sizes, sizes) || rendered.filledCount !== props.filledCount) {
        setRendered({ animate: props.animate, sizes, filledCount: props.filledCount });
        if (rendered.animate !== props.animate || !isEqual(rendered.sizes, sizes)) {
            const nothingToSweep = props.animateNewSegments && props.filledCount === 0;
            setSweep(props.animate && !nothingToSweep
                ? { previousSizes: rendered.animate === props.animate ? rendered.sizes : [], progress: 0 }
                : undefined);
            setFill(undefined);
        } else if (props.filledCount < rendered.filledCount || !props.animate || !props.animateNewSegments || prefersReducedMotion()) {
            setFill(undefined);
        } else if (!fill) {
            const newSegmentCount = props.filledCount - rendered.filledCount;
            setFill({ fromCount: rendered.filledCount, stagger: getSegmentFillStagger(newSegmentCount), elapsed: 0 });
        }
    }

    const previousSizes = sweep?.previousSizes;
    useEffect(() => {
        if (!previousSizes) return;

        let frameId: number;
        let beginTime: number | undefined;
        const update = (now: number) => {
            beginTime ??= now;
            const time = (now - beginTime) / sweepDuration;
            if (time < 1) {
                setSweep({ previousSizes, progress: ease(time) });
                frameId = requestAnimationFrame(update);
            } else {
                setSweep(undefined);
            }
        };
        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, [previousSizes]);

    const filledCountRef = useRef(props.filledCount);
    filledCountRef.current = props.filledCount;
    const fillStarted = !!fill;
    useEffect(() => {
        if (!fillStarted) return;

        let frameId: number;
        let beginTime: number | undefined;
        const update = (now: number) => {
            beginTime ??= now;
            const elapsed = now - beginTime;
            setFill(current => {
                if (!current) return current;
                const lastSegmentStart = (filledCountRef.current - 1 - current.fromCount) * current.stagger;
                return elapsed >= lastSegmentStart + segmentFillDuration ? undefined : { ...current, elapsed };
            });
            frameId = requestAnimationFrame(update);
        };
        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, [fillStarted]);

    const segments = sweep
        ? layOutSegments(sizes, sweep.previousSizes, sweep.progress)
        : layOutSegments(sizes, sizes, 1);

    const renderSegment = (segment: GoalRingSegment, color: string, key: string, thicknessScale: number = 1) => {
        if (props.outerRadius < props.innerRadius || segment.startAngle === segment.endAngle) return null;
        const middleRadius = (props.innerRadius + props.outerRadius) / 2;
        const halfThickness = (props.outerRadius - props.innerRadius) / 2 * thicknessScale;
        const path = getSegmentPath(segment, middleRadius - halfThickness, middleRadius + halfThickness, props.outerRadius);
        return <path key={key} d={path} style={{ fill: color }} />;
    };

    const diameter = props.outerRadius * 2;
    // Only while filling, since the swell overflows the ring but recharts clipped its anti-aliased edge at rest.
    return <svg className="mdhui-goal-ring" width={diameter} height={diameter} aria-hidden="true" style={fill ? { overflow: 'visible' } : undefined}>
        {segments.map((segment, index) => {
            const filling = fill && index >= fill.fromCount && index < props.filledCount;
            if (!filling) {
                return renderSegment(segment, index < props.filledCount ? props.filledColor : props.unfilledColor, `${index}`);
            }

            const progress = getSegmentFillProgress(fill, index);
            const filledPart = { startAngle: segment.startAngle, endAngle: segment.startAngle + (segment.endAngle - segment.startAngle) * Math.min(progress, 1) };
            return [
                renderSegment(segment, props.unfilledColor, `${index}`),
                progress > 0 && renderSegment(filledPart, props.filledColor, `${index}-fill`, progress > 1 ? 1 + (progress - 1) * 3 : 1)
            ];
        })}
    </svg>;
}
