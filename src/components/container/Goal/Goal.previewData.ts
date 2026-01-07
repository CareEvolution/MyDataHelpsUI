import { createRandomIntegerValueProvider, createStaticIntegerValueProvider, SingleValueProvider } from '../../../helpers';
import { GoalTier } from './Goal';

export type GoalPreviewState = 'not started' | 'in progress' | 'complete' | 'maxed out' | 'random';

export const createPreviewValueProvider = (previewState: GoalPreviewState, tiers: GoalTier[]): SingleValueProvider<number> => {
    if (tiers.length === 0) return createStaticIntegerValueProvider(0);

    const targetValue = tiers[0].targetValue;
    const maxValue = tiers[0].maxValue;

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