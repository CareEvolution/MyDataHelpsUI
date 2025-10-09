import { createRandomIntegerValueProvider, createStaticIntegerValueProvider, SingleValueProvider } from '../../../helpers';

export type GoalPreviewState = 'not started' | 'in progress' | 'complete' | 'maxed out' | 'random';

export const createPreviewValueProvider = (previewState: GoalPreviewState, targetValue: number, maxValue: number): SingleValueProvider<number> => {
    if (previewState === 'in progress') {
        return createStaticIntegerValueProvider(targetValue - 1);
    }
    if (previewState === 'complete') {
        return createStaticIntegerValueProvider(targetValue);
    }
    if (previewState === 'maxed out') {
        return createStaticIntegerValueProvider(maxValue);
    }
    if (previewState === 'random') {
        return createRandomIntegerValueProvider(maxValue);
    }
    return createStaticIntegerValueProvider(0);
};