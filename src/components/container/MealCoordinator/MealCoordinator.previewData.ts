import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';

export type MealCoordinatorPreviewState = 'no data' | 'with data';

export interface MealCoordinatorPreviewData {
    allMeals: Meal[];
    activeMeals: Meal[];
    imageUrls: { [key: string]: string };
}

export const createPreviewData = (previewState: MealCoordinatorPreviewState, date: Date): MealCoordinatorPreviewData => {
    if (previewState === 'no data') {
        return {
            allMeals: [],
            activeMeals: [],
            imageUrls: {}
        };
    } else if (previewState === 'with data') {
        const grilledCheeseMealId = uuid();

        const activeMeals: Meal[] = [
            {
                id: uuid(),
                timestamp: createDate(date, 9, 15),
                type: 'snack'
            }, {
                id: uuid(),
                timestamp: createDate(date, 9, 45),
                type: 'meal',
                description: 'Three pancakes, two eggs, hashbrowns, three strips of bacon, and a piece of toast.'
            }, {
                id: grilledCheeseMealId,
                timestamp: createDate(date, 18, 10),
                type: 'meal',
                description: 'A grilled cheese sandwich.'
            }, {
                id: uuid(),
                timestamp: createDate(date, 21, 43),
                type: 'drink',
                description: 'A diet coke.'
            }
        ];

        const imageUrls: { [key: string]: string } = {};
        imageUrls[grilledCheeseMealId] = 'https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.png';

        return {
            allMeals: [
                {
                    id: uuid(),
                    timestamp: createDate(date, 19, 22),
                    type: 'drink',
                    description: 'A root beer.',
                    archiveTimestamp: createDate(date, 19, 30)
                },
                ...activeMeals
            ],
            activeMeals: activeMeals,
            imageUrls: imageUrls
        };
    }
    return {} as MealCoordinatorPreviewData;
};

function createDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}