/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { Cell, Pie, PieChart } from 'recharts';
import GoalRing from '../../../../src/components/container/Goal/GoalRing';

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

describe('GoalRing', () => {
    describe.each([
        [1, 1], [2, 1], [3, 2], [5, 0], [7, 4], [10, 10], [20, 13], [71, 30], [100, 50]
    ])('with %i segments, %i on', (count, onCount) => {
        it.each([[30, 40], [22, 28]])('matches recharts at radii %i/%i when static.', (innerRadius, outerRadius) => {
            const colors = makeColors(count, onCount);
            const recharts = render(renderRecharts(colors, innerRadius, outerRadius, false));
            const ring = render(<GoalRing colors={colors} innerRadius={innerRadius} outerRadius={outerRadius} animate={false} />);

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
            const ring = render(<GoalRing colors={colors} innerRadius={30} outerRadius={40} animate={false} />);

            recharts.rerender(renderRecharts(colors, 30, 40, true));
            ring.rerender(<GoalRing colors={colors} innerRadius={30} outerRadius={40} animate={true} />);

            expectSameFrames(recharts, ring);
        });

        it('matches recharts when the segment count changes while animated.', () => {
            const recharts = render(renderRecharts(makeColors(5, 5), 30, 40, true));
            const ring = render(<GoalRing colors={makeColors(5, 5)} innerRadius={30} outerRadius={40} animate={true} />);
            act(() => { jest.advanceTimersByTime(1000); });

            recharts.rerender(renderRecharts(makeColors(10, 6), 30, 40, true));
            ring.rerender(<GoalRing colors={makeColors(10, 6)} innerRadius={30} outerRadius={40} animate={true} />);

            expectSameFrames(recharts, ring);
        });
    });
});
