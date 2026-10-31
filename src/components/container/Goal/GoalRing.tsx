import React, { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import useAnimationFrame from './useAnimationFrame';
import { prefersReducedMotion } from './reducedMotion';

export interface GoalRingProps {
    segmentCount: number;
    filledCount: number;
    filledColor: string;
    unfilledColor: string;
    innerRadius: number;
    outerRadius: number;
    animate: boolean;
    animateNewSegments?: boolean;
    settleKey?: number;
    onSettled?: (settleKey: number) => void;
}

interface RingSegment {
    startAngle: number;
    endAngle: number;
}

export interface RingState {
    animate: boolean;
    sizes: number[];
    filledCount: number;
}

interface RingSweep {
    previousSizes: number[];
}

interface SegmentFill {
    fromCount: number;
    stagger: number;
}

export interface RingAnimations {
    sweep?: RingSweep;
    fill?: SegmentFill;
}

const startAngle = 450;
const paddingAngle = 5;
const sweepDuration = 500;
const segmentFillDuration = 700;
const segmentFillStagger = 200;
const maxSegmentFillStaggerTotal = 1000;

// Angles are in degrees, counterclockwise from 3 o'clock, so decreasing angles run clockwise from 12 o'clock.
function computeSegmentSizes(count: number): number[] {
    const segmentSize = (360 - count * paddingAngle) / count;
    return Array(count).fill(-segmentSize);
}

function layOutSegments(sizes: number[], previousSizes: number[], progress: number): RingSegment[] {
    const segments: RingSegment[] = [];
    let angle = startAngle;
    sizes.forEach((size, index) => {
        const padding = index > 0 ? -paddingAngle : 0;
        const fromSize = previousSizes[index] ?? 0;
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

function getSegmentPath(segment: RingSegment, innerRadius: number, outerRadius: number, center: number): string {
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

// Mirrors recharts' 'ease' solver frame for frame, including its early exit, which compares error - target rather than error.
function ease(time: number): number {
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
function springEase(time: number): number {
    const overshoot = 1.9;
    const t = Math.min(Math.max(time, 0), 1) - 1;
    return 1 + (overshoot + 1) * t * t * t + overshoot * t * t;
}

function getSegmentFillProgress(fill: SegmentFill, elapsed: number, index: number): number {
    const time = (elapsed - (index - fill.fromCount) * fill.stagger) / segmentFillDuration;
    return time <= 0 ? 0 : springEase(time);
}

function getFillDuration(fill: SegmentFill, filledCount: number): number {
    return (filledCount - 1 - fill.fromCount) * fill.stagger + segmentFillDuration;
}

const notYetDrawn = (filledCount: number): RingState => ({ animate: false, sizes: [], filledCount });

export function planRingAnimations(previous: RingState, next: RingState, current: RingAnimations, animateNewSegments: boolean, reducedMotion: boolean): RingAnimations {
    const layoutChanged = previous.animate !== next.animate || !isEqual(previous.sizes, next.sizes);
    if (layoutChanged) {
        const nothingToSweep = animateNewSegments && next.filledCount === 0;
        if (!next.animate || nothingToSweep) return {};
        return { sweep: { previousSizes: previous.animate ? previous.sizes : [] } };
    }

    const fillsNewSegments = next.animate && animateNewSegments && !reducedMotion && next.filledCount > previous.filledCount;
    if (!fillsNewSegments) return { sweep: current.sweep };
    if (current.fill) return current;

    const newSegmentCount = next.filledCount - previous.filledCount;
    const stagger = Math.min(segmentFillStagger, maxSegmentFillStaggerTotal / newSegmentCount);
    return { sweep: current.sweep, fill: { fromCount: previous.filledCount, stagger } };
}

export default function GoalRing(props: GoalRingProps) {
    const sizes = computeSegmentSizes(props.segmentCount);
    const next: RingState = { animate: props.animate, sizes, filledCount: props.filledCount };

    const [previous, setPrevious] = useState<RingState>(notYetDrawn(props.filledCount));
    const [animations, setAnimations] = useState<RingAnimations>({});
    const [sweepProgress, setSweepProgress] = useState(0);
    const [fillElapsed, setFillElapsed] = useState(0);

    if (!isEqual(previous, next)) {
        const planned = planRingAnimations(previous, next, animations, !!props.animateNewSegments, prefersReducedMotion());
        setPrevious(next);
        setAnimations(planned);
        if (planned.sweep !== animations.sweep) setSweepProgress(0);
        if (planned.fill !== animations.fill) setFillElapsed(0);
    }
    const { sweep, fill } = animations;

    useAnimationFrame(sweep, elapsed => {
        const time = elapsed / sweepDuration;
        if (time < 1) {
            setSweepProgress(ease(time));
            return true;
        }
        setAnimations(current => ({ ...current, sweep: undefined }));
        return false;
    });

    useAnimationFrame(fill, elapsed => {
        if (fill && elapsed < getFillDuration(fill, props.filledCount)) {
            setFillElapsed(elapsed);
            return true;
        }
        setAnimations(current => ({ ...current, fill: undefined }));
        return false;
    });

    const animating = !!sweep || !!fill;
    const onSettledRef = useRef(props.onSettled);
    onSettledRef.current = props.onSettled;
    useEffect(() => {
        if (props.settleKey !== undefined && !animating) onSettledRef.current?.(props.settleKey);
    }, [props.settleKey, animating]);

    const segments = sweep
        ? layOutSegments(sizes, sweep.previousSizes, sweepProgress)
        : layOutSegments(sizes, sizes, 1);

    const renderSegment = (segment: RingSegment, color: string, key: string, thicknessScale: number = 1) => {
        if (props.outerRadius < props.innerRadius || segment.startAngle === segment.endAngle) return null;
        const middleRadius = (props.innerRadius + props.outerRadius) / 2;
        const halfThickness = (props.outerRadius - props.innerRadius) / 2 * thicknessScale;
        const path = getSegmentPath(segment, middleRadius - halfThickness, middleRadius + halfThickness, props.outerRadius);
        return <path key={key} d={path} style={{ fill: color }} />;
    };

    const renderFillingSegment = (segment: RingSegment, index: number) => {
        const progress = getSegmentFillProgress(fill!, fillElapsed, index);
        const filledPart = { startAngle: segment.startAngle, endAngle: segment.startAngle + (segment.endAngle - segment.startAngle) * Math.min(progress, 1) };
        const swell = progress > 1 ? 1 + (progress - 1) * 3 : 1;
        return [
            renderSegment(segment, props.unfilledColor, `${index}`),
            progress > 0 && renderSegment(filledPart, props.filledColor, `${index}-fill`, swell)
        ];
    };

    const diameter = props.outerRadius * 2;
    // The swell needs room past the ring's box, but at rest its anti-aliased outer edge must stay clipped to that box.
    return <svg className="mdhui-goal-ring" width={diameter} height={diameter} aria-hidden="true" style={fill ? { overflow: 'visible' } : undefined}>
        {segments.map((segment, index) => {
            const filling = fill && index >= fill.fromCount && index < props.filledCount;
            if (filling) return renderFillingSegment(segment, index);
            return renderSegment(segment, index < props.filledCount ? props.filledColor : props.unfilledColor, `${index}`);
        })}
    </svg>;
}
