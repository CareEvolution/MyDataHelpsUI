import { generateGlucose, generateSteps, Reading } from '../../../helpers';

export type GlucoseChartPreviewState = 'no data' | 'with data';

export interface GlucoseChartPreviewData {
    glucose: Reading[];
    steps: Reading[];
    sleepMinutes: number | undefined;
}

export const previewData = (previewState: GlucoseChartPreviewState, date: Date): GlucoseChartPreviewData => {
    if (previewState === 'no data') {
        return {
            glucose: [],
            steps: [],
            sleepMinutes: undefined
        };
    } else if (previewState === 'with data') {
        return {
            glucose: generateGlucose(date),
            steps: generateSteps(date),
            sleepMinutes: 385 + (Math.random() * 60)
        };
    }
    return {} as GlucoseChartPreviewData;
};