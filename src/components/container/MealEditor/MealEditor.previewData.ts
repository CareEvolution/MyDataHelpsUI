import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';

export type MealEditorPreviewState = 'without existing image' | 'with existing image';

export interface MealEditorPreviewData {
    allMeals: Meal[];
    activeMeals: Meal[];
    mealToEdit: Meal;
    imageUrl?: string;
}

export const createPreviewData = (previewState: MealEditorPreviewState, date: Date): MealEditorPreviewData => {
    const activeMeals: Meal[] = [
        {
            id: uuid(),
            timestamp: createDate(date, 9, 15),
            type: 'meal'
        }, {
            id: uuid(),
            timestamp: createDate(date, 14, 33),
            type: 'snack',
            description: 'A grilled cheese sandwich.'
        }, {
            id: uuid(),
            timestamp: createDate(date, 18, 10),
            type: 'drink'
        }
    ];

    return {
        allMeals: [
            {
                id: uuid(),
                timestamp: createDate(date, 16, 15),
                type: 'drink',
                hasImage: true,
                archiveTimestamp: createDate(date, 16, 30)
            },
            ...activeMeals
        ],
        activeMeals: activeMeals,
        mealToEdit: activeMeals[1],
        imageUrl: previewState === 'with existing image' ? 'https://rkstudio-customer-assets.s3.us-east-1.amazonaws.com/MDH-UI/grilled_cheese.png' : undefined
    };
};

function createDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}