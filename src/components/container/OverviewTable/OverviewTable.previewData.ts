import { createMindfulOverviewDataType, createMoodRatingDataType, createSleepOverviewDataType, createStepsOverviewDataType, generateSampleData, OverviewDataProvider } from '../../../helpers';
import { createTherapyOverviewDataType } from '../../../helpers/overview-table/data-types';

export type OverviewTablePreviewState = 'mood' | 'sleep' | 'steps' | 'mindful' | 'therapy';

const dataProviders: Record<OverviewTablePreviewState, OverviewDataProvider> = {
    'mood': {
        type: createMoodRatingDataType('Mood Rating', 'Mood Rating'),
        dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'mood-rating', 0, 10)
    },
    'sleep': {
        type: createSleepOverviewDataType(),
        dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'sleep', 200, 700)
    },
    'steps': {
        type: createStepsOverviewDataType(),
        dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'steps', 1000, 12000)
    },
    'mindful': {
        type: createMindfulOverviewDataType(),
        dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'mindful', 0, 120)
    },
    'therapy': {
        type: createTherapyOverviewDataType(),
        dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'therapy', 0, 120)
    }
}

export function createPreviewPrimaryDataProvider(previewState: OverviewTablePreviewState): OverviewDataProvider {
    return dataProviders[previewState];
}

export function createPreviewSecondaryDataProviders(previewState: OverviewTablePreviewState): OverviewDataProvider[] {
    return Object.keys(dataProviders).filter(k => k !== previewState).map(k => dataProviders[k as OverviewTablePreviewState]);
}