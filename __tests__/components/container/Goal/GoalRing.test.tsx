/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { Cell, Pie, PieChart } from 'recharts';
import GoalRing, { GoalRingProps } from '../../../../src/components/container/Goal/GoalRing';

function normalizePath(path: string | null): string {
    return (path ?? '').trim().split(/[\s,]+/).map(token => {
        const number = Number(token);
        return Number.isNaN(number) ? token : number.toFixed(6);
    }).join(' ');
}

function renderRecharts(colors: string[], innerRadius: number, outerRadius: number, animate: boolean) {
    const diameter = outerRadius * 2;
    return <PieChart width={diameter} height={diameter}>
        <Pie
            data={colors.map(color => ({ value: 1, color }))} dataKey="value"
            cx="50%" cy="50%"
            innerRadius={innerRadius} outerRadius={outerRadius}
            startAngle={450} endAngle={90} paddingAngle={5}
            isAnimationActive={animate} animationBegin={0} animationDuration={500}
            strokeWidth={0}
        >
            {colors.map((color, index) => <Cell key={index} style={{ fill: color }} />)}
        </Pie>
    </PieChart>;
}

function getPaths(container: HTMLElement, selector: string) {
    return Array.from(container.querySelectorAll(selector)).map(path => ({
        d: normalizePath(path.getAttribute('d')),
        fill: (path as SVGPathElement).style.fill
    }));
}

function makeColors(count: number, onCount: number): string[] {
    return Array.from({ length: count }, (_, index) => index < onCount ? 'green' : 'gray');
}

function renderRing(count: number, onCount: number, props: Partial<GoalRingProps> = {}) {
    return <GoalRing
        segmentCount={count} filledCount={onCount} filledColor="green" unfilledColor="gray"
        innerRadius={30} outerRadius={40} animate={false}
        {...props}
    />;
}

describe('GoalRing', () => {
    describe.each([
        [1, 1], [2, 1], [3, 2], [5, 0], [7, 4], [10, 10], [20, 13], [71, 30], [100, 50]
    ])('with %i segments, %i on', (count, onCount) => {
        it.each([[30, 40], [22, 28]])('matches recharts at radii %i/%i when static.', (innerRadius, outerRadius) => {
            const colors = makeColors(count, onCount);
            const recharts = render(renderRecharts(colors, innerRadius, outerRadius, false));
            const ring = render(renderRing(count, onCount, { innerRadius, outerRadius }));

            const expected = getPaths(recharts.container, 'path.recharts-sector');
            expect(expected.length).toBeGreaterThan(0);
            expect(getPaths(ring.container, 'path')).toEqual(expected);
        });
    });

    describe('when animating', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        const expectSameFrames = (recharts: RenderResult, ring: RenderResult) => {
            const rechartsFrames: string[] = [];
            const ringFrames: string[] = [];
            const recordFrame = (frames: string[], frame: string) => {
                if (frames[frames.length - 1] !== frame) frames.push(frame);
            };
            for (let elapsed = 0; elapsed < 1000; elapsed += 16) {
                act(() => { jest.advanceTimersByTime(16); });
                recordFrame(rechartsFrames, JSON.stringify(getPaths(recharts.container, 'path.recharts-sector')));
                recordFrame(ringFrames, JSON.stringify(getPaths(ring.container, 'path')));
            }

            expect(ringFrames.length).toBeGreaterThan(20);
            expect(ringFrames).toEqual(rechartsFrames);
        };

        it.each([[7, 3], [10, 10], [1, 1]])('matches recharts through the sweep with %i segments, %i on.', (count, onCount) => {
            const colors = makeColors(count, onCount);
            const recharts = render(renderRecharts(colors, 30, 40, false));
            const ring = render(renderRing(count, onCount));

            recharts.rerender(renderRecharts(colors, 30, 40, true));
            ring.rerender(renderRing(count, onCount, { animate: true }));

            expectSameFrames(recharts, ring);
        });

        it('matches recharts when the segment count changes while animated.', () => {
            const recharts = render(renderRecharts(makeColors(5, 5), 30, 40, true));
            const ring = render(renderRing(5, 5, { animate: true }));
            act(() => { jest.advanceTimersByTime(1000); });

            recharts.rerender(renderRecharts(makeColors(10, 6), 30, 40, true));
            ring.rerender(renderRing(10, 6, { animate: true }));

            expectSameFrames(recharts, ring);
        });
    });

    describe('when new segments fill', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        const settledPaths = (count: number, onCount: number) => getPaths(render(renderRing(count, onCount)).container, 'path');

        const renderSettled = (count: number, onCount: number, props: Partial<GoalRingProps>) => {
            const ring = render(renderRing(count, onCount, { animate: true, ...props }));
            act(() => { jest.advanceTimersByTime(1000); });
            expect(getPaths(ring.container, 'path')).toEqual(settledPaths(count, onCount));
            return ring;
        };

        const filledFraction = (ring: RenderResult, index: number) => {
            const fillPath = ring.container.querySelectorAll('path')[index + 1] as SVGPathElement;
            return fillPath?.style.fill === 'green' ? fillPath : undefined;
        };

        it('sweeps only the new segment in and then settles.', () => {
            const ring = renderSettled(7, 3, { animateNewSegments: true });

            ring.rerender(renderRing(7, 4, { animate: true, animateNewSegments: true }));
            const paths = ring.container.querySelectorAll('path');
            expect(paths).toHaveLength(7);
            expect((paths[3] as SVGPathElement).style.fill).toBe('gray');

            const fillPaths: string[] = [];
            for (let elapsed = 0; elapsed < 1000; elapsed += 16) {
                act(() => { jest.advanceTimersByTime(16); });
                const fill = filledFraction(ring, 3);
                if (fill) fillPaths.push(fill.getAttribute('d')!);
            }

            expect(new Set(fillPaths).size).toBeGreaterThan(20);
            expect(getPaths(ring.container, 'path')).toEqual(settledPaths(7, 4));
        });

        it('leaves the segments that were already filled alone.', () => {
            const ring = renderSettled(7, 3, { animateNewSegments: true });
            const before = getPaths(ring.container, 'path').slice(0, 3);

            ring.rerender(renderRing(7, 4, { animate: true, animateNewSegments: true }));
            for (let elapsed = 0; elapsed < 1000; elapsed += 16) {
                act(() => { jest.advanceTimersByTime(16); });
                expect(getPaths(ring.container, 'path').slice(0, 3)).toEqual(before);
            }
        });

        it('fills several new segments one after another.', () => {
            const ring = renderSettled(7, 2, { animateNewSegments: true });

            ring.rerender(renderRing(7, 5, { animate: true, animateNewSegments: true }));
            act(() => { jest.advanceTimersByTime(160); });
            const paths = Array.from(ring.container.querySelectorAll('path')).map(path => (path as SVGPathElement).style.fill);
            expect(paths.filter(fill => fill === 'green')).toHaveLength(3);

            act(() => { jest.advanceTimersByTime(2000); });
            expect(getPaths(ring.container, 'path')).toEqual(settledPaths(7, 5));
        });

        it('fills the first segment without sweeping the whole ring.', () => {
            const ring = render(renderRing(7, 0, { animate: false, animateNewSegments: true }));
            ring.rerender(renderRing(7, 0, { animate: true, animateNewSegments: true }));
            act(() => { jest.advanceTimersByTime(16); });
            expect(getPaths(ring.container, 'path')).toEqual(settledPaths(7, 0));

            ring.rerender(renderRing(7, 1, { animate: true, animateNewSegments: true }));
            expect(ring.container.querySelectorAll('path')).toHaveLength(7);
            act(() => { jest.advanceTimersByTime(200); });
            expect(ring.container.querySelectorAll('path')).toHaveLength(8);
        });

        it('jumps straight to the new value when not enabled.', () => {
            const ring = renderSettled(7, 3, {});
            ring.rerender(renderRing(7, 4, { animate: true }));
            expect(getPaths(ring.container, 'path')).toEqual(settledPaths(7, 4));
        });

        it('jumps straight to a lower value.', () => {
            const ring = renderSettled(7, 5, { animateNewSegments: true });
            ring.rerender(renderRing(7, 2, { animate: true, animateNewSegments: true }));
            expect(getPaths(ring.container, 'path')).toEqual(settledPaths(7, 2));
        });

        it('jumps straight to the new value when the device asks for reduced motion.', () => {
            const matchMedia = window.matchMedia;
            window.matchMedia = jest.fn().mockReturnValue({ matches: true });
            try {
                const ring = renderSettled(7, 3, { animateNewSegments: true });
                ring.rerender(renderRing(7, 4, { animate: true, animateNewSegments: true }));
                expect(getPaths(ring.container, 'path')).toEqual(settledPaths(7, 4));
            } finally {
                window.matchMedia = matchMedia;
            }
        });
    });
});
