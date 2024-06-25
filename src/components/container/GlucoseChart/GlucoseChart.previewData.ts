import { add, startOfDay } from 'date-fns';
import { generateGlucose, generateSleep, generateSteps, Meal, Reading } from '../../../helpers';

export type GlucoseChartPreviewState = 'no data' | 'with data' | 'with data and meals';

export interface GlucoseChartPreviewData {
    glucose: Reading[];
    steps: Reading[];
    sleep: Reading[];
    meals: Meal[];
}

export const previewData = (previewState: GlucoseChartPreviewState, date: Date): GlucoseChartPreviewData => {
    if (previewState === 'no data') {
        return {
            glucose: [],
            steps: [],
            sleep: [],
            meals: []
        };
    } else if (previewState === 'with data') {
        return {
            glucose: generateGlucose(date),
            steps: generateSteps(date),
            sleep: generateSleep(date),
            meals: []
        };
    } else if (previewState === 'with data and meals') {
        return {
            glucose: generateGlucose(date),
            steps: generateSteps(date),
            sleep: generateSleep(date),
            meals: [{
                timestamp: createObservationDate(date, 9, 15),
                type: 'meal'
            }, {
                timestamp: createObservationDate(date, 16, 25),
                type: 'snack'
            }, {
                timestamp: createObservationDate(date, 18, 10),
                type: 'drink'
            }, {
                timestamp: createObservationDate(date, 21, 43),
                type: 'meal'
            }]
        };
    }
    return {} as GlucoseChartPreviewData;
};

function createObservationDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}