import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';

export type MealEditorPreviewState = 'loaded' | 'with image' | 'with automated meal analysis' | 'with image and automated meal analysis';

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
            description: 'A grilled cheese sandwich.',
            analysis: previewState.endsWith('automated meal analysis') ? {
                timestamp: createDate(date, 14, 45),
                items: [{ 'name': 'bread', 'confidenceScore': 0.89 }, { 'name': 'cheese', 'confidenceScore': 0.75 }]
            } : undefined,
            items: !previewState.endsWith('automated meal analysis') ? [{ 'name': 'italian bread' }, { 'name': 'american cheese' }] : undefined
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
        imageUrl: previewState.startsWith('with image')
            ? `https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.png?cacheBust=${new Date().getTime()}`
            : undefined
    };
};

function createDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}