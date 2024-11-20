import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import grilledCheese from '../../../assets/grilled_cheese.png';

export type MealEditorPreviewState = 'without existing image' | 'with existing image';

export interface MealEditorPreviewData {
    meals: Meal[];
    mealToEdit: Meal;
    imageUrl?: string;
}

export const createPreviewData = (previewState: MealEditorPreviewState, date: Date): MealEditorPreviewData => {
    const meals: Meal[] = [{
        id: uuid(),
        timestamp: createObservationDate(date, 9, 15),
        type: 'meal'
    }, {
        id: uuid(),
        timestamp: createObservationDate(date, 14, 33),
        type: 'snack',
        description: 'A grilled cheese sandwich.'
    }, {
        id: uuid(),
        timestamp: createObservationDate(date, 18, 10),
        type: 'drink'
    }];

    return {
        meals: meals,
        mealToEdit: meals[1],
        imageUrl: previewState === 'with existing image' ? grilledCheese : undefined
    };
};

function createObservationDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}