import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';

export type MealCoordinatorPreviewState = 'no data' | 'with data';

export interface MealCoordinatorPreviewData {
    meals: Meal[];
}

export const previewData = (previewState: MealCoordinatorPreviewState, date: Date): MealCoordinatorPreviewData => {
    if (previewState === 'no data') {
        return {
            meals: []
        };
    } else if (previewState === 'with data') {
        return {
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
    return {} as MealCoordinatorPreviewData;
};

function createObservationDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}