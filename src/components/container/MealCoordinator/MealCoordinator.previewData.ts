import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import grilledCheese from '../../../assets/grilled_cheese.png';

export type MealCoordinatorPreviewState = 'no data' | 'with data';

export interface MealCoordinatorPreviewData {
    meals: Meal[];
    imageUrls: { [key: string]: string };
}

export const createPreviewData = (previewState: MealCoordinatorPreviewState, date: Date): MealCoordinatorPreviewData => {
    if (previewState === 'no data') {
        return {
            meals: [],
            imageUrls: {}
        };
    } else if (previewState === 'with data') {
        return {
            meals: [{
                id: uuid(),
                timestamp: createObservationDate(date, 9, 15),
                type: 'snack'
            }, {
                id: uuid(),
                timestamp: createObservationDate(date, 9, 25),
                type: 'meal',
                description: 'Three pancakes, two eggs, hashbrowns, three strips of bacon, and a piece of toast.'
            }, {
                id: uuid(),
                timestamp: createObservationDate(date, 18, 10),
                type: 'meal',
                description: 'A grilled cheese sandwich.',
                imageFileName: 'grilled_cheese.png'
            }, {
                id: uuid(),
                timestamp: createObservationDate(date, 21, 43),
                type: 'drink',
                description: 'A diet coke.'
            }],
            imageUrls: {
                'grilled_cheese.png': grilledCheese
            }
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