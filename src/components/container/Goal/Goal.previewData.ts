import { createRandomIntegerValueProvider, createStaticIntegerValueProvider, SingleValueProvider } from '../../../helpers';
import { GoalTarget } from './Goal';

export type GoalPreviewState = 'not started' | 'in progress' | 'complete' | 'maxed out' | 'random';

export const createPreviewValueProvider = (previewState: GoalPreviewState, targetValue: number | GoalTarget[], maxValue: number): SingleValueProvider<number> => {
    if (Array.isArray(targetValue)) {
        targetValue = targetValue.length > 0 ? targetValue[0].targetValue : maxValue;
    }

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