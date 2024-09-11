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
                type: 'snack',
                description: 'Here\'s a meal description that will require wrapping to fit completely within the bounds of the screen. The maximum length allowed is 250 characters, so the display will need to accommodate that. This description is exactly 250 characters in length.'
            }, {
                id: uuid(),
                timestamp: createObservationDate(date, 18, 10),
                type: 'drink',
                description: 'Here is a shorter meal description.'
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