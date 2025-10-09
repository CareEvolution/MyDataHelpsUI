import { generateGlucose, generateSteps, Reading } from '../../../helpers';

export type GlucoseChartPreviewState = 'no data' | 'no data with history' | 'with gap in data' | 'with partial data' | 'with data';

export interface GlucoseChartPreviewData {
    glucose: Reading[];
    hasAnyGlucoseReadings: boolean;
    steps: Reading[];
    sleepMinutes: number | undefined;
}

export const previewData = async (previewState: GlucoseChartPreviewState, date: Date): Promise<GlucoseChartPreviewData> => {
    if (previewState === 'no data with history') {
        return {
            glucose: [],
            hasAnyGlucoseReadings: true,
            steps: [],
            sleepMinutes: undefined
        };
    }
    if (previewState === 'with gap in data') {
        return {
            glucose: (await generateGlucose(date)).filter(reading => reading.timestamp.getHours() <= 16 || reading.timestamp.getHours() >= 19),
            hasAnyGlucoseReadings: true,
            steps: generateSteps(date),
            sleepMinutes: 385 + (Math.random() * 60)
        };
    }
    if (previewState === 'with partial data') {
        return {
            glucose: (await generateGlucose(date)).filter(reading => reading.timestamp.getHours() <= 16),
            hasAnyGlucoseReadings: true,
            steps: generateSteps(date),
            sleepMinutes: 385 + (Math.random() * 60)
        };
    }
    if (previewState === 'with data') {
        return {
            glucose: await generateGlucose(date),
            hasAnyGlucoseReadings: true,
            steps: generateSteps(date),
            sleepMinutes: 385 + (Math.random() * 60)
        };
    }
    return {
        glucose: [],
        hasAnyGlucoseReadings: false,
        steps: [],
        sleepMinutes: undefined
    };
};