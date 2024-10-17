import { SingleValueProvider, SingleValueProviderFactory } from '../../../helpers';

export type AchievementPreviewState = 'not started' | 'in progress' | 'complete' | 'maxed out' | 'random';

export interface AchievementPreviewData {
    valueProvider: SingleValueProvider<number>;
}

export const previewData = (previewState: AchievementPreviewState, targetValue: number, maxValue: number): AchievementPreviewData => {
    if (previewState === 'in progress') {
        return { valueProvider: SingleValueProviderFactory.createStaticIntegerValueProvider(targetValue - 1) }
    }
    if (previewState === 'complete') {
        return { valueProvider: SingleValueProviderFactory.createStaticIntegerValueProvider(targetValue) }
    }
    if (previewState === 'maxed out') {
        return { valueProvider: SingleValueProviderFactory.createStaticIntegerValueProvider(maxValue) }
    }
    if (previewState === 'random') {
        return { valueProvider: SingleValueProviderFactory.createRandomIntegerValueProvider(maxValue) }
    }
    return { valueProvider: SingleValueProviderFactory.createStaticIntegerValueProvider(0) }
};