import { SingleValueProvider, ValueProviderFactory } from '../../../helpers';

export type AchievementPreviewState = 'not started' | 'in progress' | 'complete' | 'maxed out' | 'random';

export interface AchievementPreviewData {
    valueProvider: SingleValueProvider<number>;
}

export const previewData = (previewState: AchievementPreviewState, targetValue: number, maxValue: number): AchievementPreviewData => {
    if (previewState === 'in progress') {
        return { valueProvider: ValueProviderFactory.createStaticIntegerValueProvider(targetValue - 1) }
    }
    if (previewState === 'complete') {
        return { valueProvider: ValueProviderFactory.createStaticIntegerValueProvider(targetValue) }
    }
    if (previewState === 'maxed out') {
        return { valueProvider: ValueProviderFactory.createStaticIntegerValueProvider(maxValue) }
    }
    if (previewState === 'random') {
        return { valueProvider: ValueProviderFactory.createRandomIntegerValueProvider(maxValue) }
    }
    return { valueProvider: ValueProviderFactory.createStaticIntegerValueProvider(0) }
};