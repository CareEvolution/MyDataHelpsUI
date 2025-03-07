import { generateGlucose, generateSteps, Reading } from '../../../helpers';

export type GlucoseChartPreviewState = 'no data' | 'with gap in data' | 'with partial data' | 'with data';

export interface GlucoseChartPreviewData {
    glucose: Reading[];
    steps: Reading[];
    sleepMinutes: number | undefined;
}

export const previewData = async (previewState: GlucoseChartPreviewState, date: Date): Promise<GlucoseChartPreviewData> => {
    if (previewState === 'no data') {
        return {
            glucose: [],
            steps: [],
            sleepMinutes: undefined
        };
    }
    if (previewState === 'with gap in data') {
        return {
            glucose: (await generateGlucose(date)).filter(reading => reading.timestamp.getHours() <= 16 || reading.timestamp.getHours() >= 19),
            steps: generateSteps(date),
            sleepMinutes: 385 + (Math.random() * 60)
        };
    }
    if (previewState === 'with partial data') {
        return {
            glucose: (await generateGlucose(date)).filter(reading => reading.timestamp.getHours() <= 16),
            steps: generateSteps(date),
            sleepMinutes: 385 + (Math.random() * 60)
        };
    }
    if (previewState === 'with data') {
        return {
            glucose: await generateGlucose(date),
            steps: generateSteps(date),
            sleepMinutes: 385 + (Math.random() * 60)
        };
    }
    return {} as GlucoseChartPreviewData;
};