import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';

export type MealEditorPreviewState = 'add' | 'edit';

export interface MealEditorPreviewData {
    mealToEdit: Meal;
    meals: Meal[];
}

export const previewData = (previewState: MealEditorPreviewState, date: Date): MealEditorPreviewData => {
    let mealToEdit: Meal = {
        id: uuid(),
        timestamp: createObservationDate(date, 14, 33),
        type: 'snack'
    };

    const otherMeals: Meal[] = [{
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
    }];

    if (previewState === 'add') {
        return {
            mealToEdit: mealToEdit,
            meals: otherMeals
        };
    } else if (previewState === 'edit') {
        return {
            mealToEdit: mealToEdit,
            meals: [...otherMeals, mealToEdit]
        };
    }

    return {} as MealEditorPreviewData;
};

function createObservationDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}