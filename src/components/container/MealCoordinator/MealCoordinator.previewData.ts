import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';

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
                id: uuid(),
                timestamp: createObservationDate(date, 9, 15),
                type: 'meal'
            }, {
                id: uuid(),
                timestamp: createObservationDate(date, 16, 25),
                type: 'snack'
            }, {
                id: uuid(),
                timestamp: createObservationDate(date, 18, 10),
                type: 'drink'
            }, {
                id: uuid(),
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