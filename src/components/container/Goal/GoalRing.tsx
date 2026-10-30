import React, { useEffect, useState } from 'react';
import { isEqual } from 'lodash';

export interface GoalRingProps {
    colors: string[];
    innerRadius: number;
    outerRadius: number;
    animate: boolean;
}

export interface GoalRingSegment {
    startAngle: number;
    endAngle: number;
}

const startAngle = 450;
const paddingAngle = 5;
const animationDuration = 500;

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

export function getSegmentPath(segment: GoalRingSegment, innerRadius: number, outerRadius: number): string {
    // A sweep of exactly 360 degrees would start and end on the same point, which SVG draws as nothing.
    const sweep = Math.sign(segment.endAngle - segment.startAngle) * Math.min(Math.abs(segment.endAngle - segment.startAngle), 359.999);
    const endAngle = segment.startAngle + sweep;
    const largeArc = +(Math.abs(sweep) > 180);
    const clockwise = +(segment.startAngle > endAngle);
    const center = outerRadius;
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

interface RingAnimation {
    previousSizes: number[];
    progress: number;
}

export default function GoalRing(props: GoalRingProps) {
    const sizes = computeSegmentSizes(props.colors.length);

    const [rendered, setRendered] = useState<{ animate: boolean, sizes: number[] }>({ animate: !props.animate, sizes: [] });
    const [animation, setAnimation] = useState<RingAnimation>();

    if (rendered.animate !== props.animate || !isEqual(rendered.sizes, sizes)) {
        setRendered({ animate: props.animate, sizes });
        setAnimation(props.animate
            ? { previousSizes: rendered.animate === props.animate ? rendered.sizes : [], progress: 0 }
            : undefined);
    }

    const previousSizes = animation?.previousSizes;
    useEffect(() => {
        if (!previousSizes) return;

        let frameId: number;
        let beginTime: number | undefined;
        const update = (now: number) => {
            beginTime ??= now;
            const time = (now - beginTime) / animationDuration;
            if (time < 1) {
                setAnimation({ previousSizes, progress: ease(time) });
                frameId = requestAnimationFrame(update);
            } else {
                setAnimation(undefined);
            }
        };
        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, [previousSizes]);

    const segments = animation
        ? layOutSegments(sizes, animation.previousSizes, animation.progress)
        : layOutSegments(sizes, sizes, 1);

    const diameter = props.outerRadius * 2;
    return <svg className="mdhui-goal-ring" width={diameter} height={diameter} aria-hidden="true">
        {segments.map((segment, index) => {
            if (props.outerRadius < props.innerRadius || segment.startAngle === segment.endAngle) return null;
            return <path key={index} d={getSegmentPath(segment, props.innerRadius, props.outerRadius)} style={{ fill: props.colors[index] }} />;
        })}
    </svg>;
}
