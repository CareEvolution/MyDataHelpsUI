import { generateGlucose, generateSleep, generateSteps, Reading } from '../../../helpers';

export type GlucoseChartPreviewState = 'no data' | 'with data';

export interface GlucoseChartPreviewData {
    glucose: Reading[];
    steps: Reading[];
    sleep: Reading[];
}

export const previewData = (previewState: GlucoseChartPreviewState, date: Date): GlucoseChartPreviewData => {
    if (previewState === 'no data') {
        return {
            glucose: [],
            steps: [],
            sleep: []
        };
    } else if (previewState === 'with data') {
        return {
            glucose: generateGlucose(date),
            steps: generateSteps(date),
            sleep: generateSleep(date)
        };
    }
    return {} as GlucoseChartPreviewData;
};