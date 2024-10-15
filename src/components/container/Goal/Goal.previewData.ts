import { SingleValueProvider, SingleValueProviderFactory } from '../../../helpers';

export type GoalPreviewState = 'not started' | 'in progress' | 'complete' | 'maxed out' | 'random';

export const createPreviewValueProvider = (previewState: GoalPreviewState, targetValue: number, maxValue: number): SingleValueProvider<number> => {
    if (previewState === 'in progress') {
        return SingleValueProviderFactory.createStaticIntegerValueProvider(targetValue - 1);
    }
    if (previewState === 'complete') {
        return SingleValueProviderFactory.createStaticIntegerValueProvider(targetValue);
    }
    if (previewState === 'maxed out') {
        return SingleValueProviderFactory.createStaticIntegerValueProvider(maxValue);
    }
    if (previewState === 'random') {
        return SingleValueProviderFactory.createRandomIntegerValueProvider(maxValue);
    }
    return SingleValueProviderFactory.createStaticIntegerValueProvider(0);
};