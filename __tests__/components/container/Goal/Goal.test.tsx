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
});
