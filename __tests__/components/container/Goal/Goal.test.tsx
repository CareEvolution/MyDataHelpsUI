/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, render } from '@testing-library/react';
import MyDataHelps from '@careevolution/mydatahelps-js';
import Goal from '../../../../src/components/container/Goal/Goal';
import { createStaticIntegerValueProvider } from '../../../../src/helpers/single-value-providers';

jest.mock('../../../../src/helpers/AIAssistant', () => ({}));
jest.mock('../../../../src/components/presentational', () => ({
    LayoutContext: jest.requireActual('../../../../src/components/presentational/Layout/Layout').LayoutContext
}));

describe('Goal', () => {
    let becameVisible: (() => void) | undefined;

    beforeEach(() => {
        jest.useFakeTimers();
        becameVisible = undefined;
        (MyDataHelps as any).on = jest.fn((event: string, handler: () => void) => {
            if (event === 'applicationDidBecomeVisible') becameVisible = handler;
        });
        (MyDataHelps as any).off = jest.fn();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const renderGoal = (value: number, animateNewSegments?: boolean) =>
        <Goal label="Entries" targetValue={7} maxValue={7} valueProvider={createStaticIntegerValueProvider(value)} animateNewSegments={animateNewSegments} />;

    const advance = async (milliseconds: number) => {
        for (let elapsed = 0; elapsed < milliseconds; elapsed += 50) {
            await act(async () => { await jest.advanceTimersByTimeAsync(50); });
        }
    };

    const settle = () => advance(2000);

    const ratioText = (container: HTMLElement) => container.querySelector('.mdhui-goal-ratio')?.textContent;

    it('keeps showing the current value while it refreshes.', async () => {
        const { container, rerender } = render(renderGoal(3, true));
        await settle();
        expect(ratioText(container)).toBe('3/7');

        rerender(renderGoal(4, true));
        expect(ratioText(container)).toBe('3/7');
        expect(container.querySelector('.mdhui-goal-ratio-loading')).toBeNull();
        await settle();
        expect(ratioText(container)).toBe('4/7');
    });

    it('keeps showing the current value when the app becomes visible again.', async () => {
        const { container } = render(renderGoal(3, true));
        await settle();

        act(() => { becameVisible!(); });
        expect(ratioText(container)).toBe('3/7');
        await settle();
        expect(ratioText(container)).toBe('3/7');
    });

    it('shows the loading indicator while it refreshes when new segments do not animate.', async () => {
        const { container, rerender } = render(renderGoal(3));
        await settle();

        rerender(renderGoal(4));
        expect(container.querySelector('.mdhui-goal-ratio-loading')).not.toBeNull();
        await settle();
        expect(ratioText(container)).toBe('4/7');
    });

    it('fills in only the new segment when the value goes up.', async () => {
        const { container, rerender } = render(renderGoal(3, true));
        await settle();
        const filledBefore = Array.from(container.querySelectorAll('.mdhui-goal-ring path')).slice(0, 3).map(path => path.getAttribute('d'));

        rerender(renderGoal(4, true));
        await advance(300);
        const paths = Array.from(container.querySelectorAll('.mdhui-goal-ring path'));
        expect(paths).toHaveLength(8);
        expect(paths.slice(0, 3).map(path => path.getAttribute('d'))).toEqual(filledBefore);

        await settle();
        expect(container.querySelectorAll('.mdhui-goal-ring path')).toHaveLength(7);
    });

    it('shows the image from iconUrl in place of the icon.', async () => {
        const { container } = render(<Goal label="Entries" targetValue={7} maxValue={7} valueProvider={createStaticIntegerValueProvider(3)} iconUrl="medal.svg" />);
        await settle();

        const iconWrapper = container.querySelector('.mdhui-goal-chart-icon-wrapper')!;
        expect(iconWrapper.querySelector('img')?.getAttribute('src')).toBe('medal.svg');
        expect(iconWrapper.querySelector('svg')).toBeNull();
    });

    it.each([[0, true], [3, true], [7, false]])('greys out the image at %i of 7 until the goal is complete.', async (value, unearned) => {
        const { container } = render(<Goal label="Entries" targetValue={7} maxValue={7} valueProvider={createStaticIntegerValueProvider(value)} iconUrl="medal.svg" />);
        await settle();

        expect(container.querySelector('.mdhui-goal-chart-icon-image')!.classList.contains('unearned')).toBe(unearned);
    });

    describe('celebration', () => {
        const getContext = HTMLCanvasElement.prototype.getContext;

        beforeEach(() => {
            HTMLCanvasElement.prototype.getContext = jest.fn(() => null) as any;
        });

        afterEach(() => {
            HTMLCanvasElement.prototype.getContext = getContext;
        });

        const renderCelebratingGoal = (value: number, props: Partial<React.ComponentProps<typeof Goal>> = {}) =>
            <Goal label="Entries" targetValue={7} maxValue={7} valueProvider={createStaticIntegerValueProvider(value)} iconUrl="medal.svg"
                animateNewSegments={true} celebration="confetti" {...props} />;

        const isCelebrating = (container: HTMLElement) => !!container.querySelector('canvas.mdhui-goal-celebration');
        const imageClasses = (container: HTMLElement) => container.querySelector('.mdhui-goal-chart-icon-image')!.classList;

        it('waits for the last segment to fill, then stamps the image in and celebrates.', async () => {
            const { container, rerender } = render(renderCelebratingGoal(6));
            await settle();

            rerender(renderCelebratingGoal(7));
            await advance(400);
            expect(isCelebrating(container)).toBe(false);
            expect(imageClasses(container).contains('unearned')).toBe(true);

            await advance(400);
            expect(isCelebrating(container)).toBe(true);
            expect(imageClasses(container).contains('unearned')).toBe(false);
            expect(container.querySelector('.mdhui-goal-chart-icon-wrapper')!.classList.contains('stamp')).toBe(true);
            expect(container.querySelector('.mdhui-goal-chart-icon-shine')).not.toBeNull();

            await advance(5000);
            expect(isCelebrating(container)).toBe(false);
        });

        it('sweeps the shine across a Font Awesome icon in its shape.', async () => {
            const { container, rerender } = render(renderCelebratingGoal(6, { iconUrl: undefined }));
            await settle();
            rerender(renderCelebratingGoal(7, { iconUrl: undefined }));
            await advance(800);

            const shine = container.querySelector<HTMLElement>('.mdhui-goal-chart-icon-shine')!;
            expect(shine.classList.contains('icon')).toBe(true);
            expect(decodeURIComponent(shine.style.maskImage)).toContain('<path d="M');
        });

        const ringPaths = (container: HTMLElement) => Array.from(container.querySelectorAll('.mdhui-goal-ring path')).map(path => path.getAttribute('d')).join('|');

        const waitForCelebration = async (container: HTMLElement) => {
            for (let elapsed = 50; elapsed <= 3000; elapsed += 50) {
                await advance(50);
                if (isCelebrating(container)) return { ring: ringPaths(container), elapsed };
            }
            throw new Error('The celebration never started.');
        };

        it('waits for a fill that grew while it was running.', async () => {
            const { container, rerender } = render(renderCelebratingGoal(3));
            await settle();

            rerender(renderCelebratingGoal(5));
            await advance(100);
            rerender(renderCelebratingGoal(7));

            const { ring } = await waitForCelebration(container);
            await settle();
            expect(ring).toBe(ringPaths(container));
        });

        it('waits for the ring to resize when completing changes the number of segments.', async () => {
            const targets = { targetValue: [{ targetValue: 3 }, { targetValue: 5 }], maxValue: 7 };
            const { container, rerender } = render(renderCelebratingGoal(4, targets));
            await settle();
            expect(container.querySelectorAll('.mdhui-goal-ring path')).toHaveLength(5);

            rerender(renderCelebratingGoal(5, targets));
            const { ring, elapsed } = await waitForCelebration(container);
            await settle();
            expect(container.querySelectorAll('.mdhui-goal-ring path')).toHaveLength(7);
            expect(ring).toBe(ringPaths(container));
            expect(elapsed).toBeLessThanOrEqual(700);
        });

        it('celebrates a goal whose segments are scaled down.', async () => {
            const scaled = { targetValue: 100, maxValue: 100, maxSegments: 10 };
            const { container, rerender } = render(renderCelebratingGoal(95, scaled));
            await settle();

            rerender(renderCelebratingGoal(100, scaled));
            await waitForCelebration(container);
        });

        it('keeps a Font Awesome icon in its in-progress color until the stamp.', async () => {
            const colors = { iconUrl: undefined, inProgressColor: 'blue', completedColor: 'green' };
            const iconColor = (container: HTMLElement) => container.querySelector<HTMLElement>('.mdhui-goal-chart-icon')!.style.color;
            const { container, rerender } = render(renderCelebratingGoal(6, colors));
            await settle();

            rerender(renderCelebratingGoal(7, colors));
            await advance(200);
            expect(isCelebrating(container)).toBe(false);
            expect(iconColor(container)).toBe('blue');

            await waitForCelebration(container);
            expect(iconColor(container)).toBe('green');
        });

        it('leaves no timers or frames running when unmounted mid-celebration.', async () => {
            const { container, rerender, unmount } = render(renderCelebratingGoal(6));
            await settle();
            rerender(renderCelebratingGoal(7));
            await waitForCelebration(container);

            unmount();
            expect(jest.getTimerCount()).toBe(0);
        });

        const expectNoCelebration = async (container: HTMLElement) => {
            for (let elapsed = 0; elapsed < 2000; elapsed += 100) {
                await advance(100);
                expect(isCelebrating(container)).toBe(false);
            }
        };

        it('does not celebrate when the goal loads already complete.', async () => {
            const { container } = render(renderCelebratingGoal(7));
            await expectNoCelebration(container);
        });

        it('does not celebrate when no celebration is set.', async () => {
            const { container, rerender } = render(renderCelebratingGoal(6, { celebration: undefined }));
            await settle();
            rerender(renderCelebratingGoal(7, { celebration: undefined }));
            await expectNoCelebration(container);
        });

        it('does not celebrate again when the app becomes visible at 7 of 7.', async () => {
            const { container, rerender } = render(renderCelebratingGoal(6));
            await settle();
            rerender(renderCelebratingGoal(7));
            await advance(6000);

            act(() => { becameVisible!(); });
            await expectNoCelebration(container);
        });

        it('does not celebrate again when the app becomes visible at 7 of 7 and new segments do not animate.', async () => {
            const { container, rerender } = render(renderCelebratingGoal(6, { animateNewSegments: false }));
            await settle();
            const completeProvider = createStaticIntegerValueProvider(7);
            const getValue = jest.spyOn(completeProvider, 'getValue');
            rerender(renderCelebratingGoal(7, { animateNewSegments: false, valueProvider: completeProvider }));
            await advance(6000);

            act(() => { becameVisible!(); });
            await expectNoCelebration(container);
            expect(getValue).toHaveBeenCalledTimes(2);
            expect(ratioText(container)).toBe('7/7');
        });

        it('celebrates after the ring sweeps in when new segments do not animate.', async () => {
            const { container, rerender } = render(renderCelebratingGoal(3, { animateNewSegments: false }));
            await settle();

            rerender(renderCelebratingGoal(7, { animateNewSegments: false }));
            await advance(300);
            expect(isCelebrating(container)).toBe(false);
            await advance(500);
            expect(isCelebrating(container)).toBe(true);
        });

        it('only fades the image to color when the device asks for reduced motion.', async () => {
            const matchMedia = window.matchMedia;
            window.matchMedia = jest.fn().mockReturnValue({ matches: true });
            try {
                const { container, rerender } = render(renderCelebratingGoal(6));
                await settle();
                rerender(renderCelebratingGoal(7));
                await advance(100);

                expect(isCelebrating(container)).toBe(false);
                expect(container.querySelector('.mdhui-goal-chart-icon-wrapper')!.classList.contains('stamp')).toBe(false);
                expect(imageClasses(container).contains('reveal')).toBe(true);
                expect(imageClasses(container).contains('unearned')).toBe(false);
            } finally {
                window.matchMedia = matchMedia;
            }
        });
    });
});
