import { add, startOfDay } from 'date-fns';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import grilledCheese from '../../../assets/grilled_cheese.png';
import grilledCheese2 from '../../../assets/grilled_cheese2.png';

export type MealEditorPreviewState = 'without image' | 'with new image' | 'with existing image' | 'with modified image' | 'with removed image';

export interface MealEditorPreviewData {
    meals: Meal[];
    mealToEdit: Meal;
    originalImageUrl?: string;
    currentImageUrl?: string;
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

    const originalImageUrl = previewState !== 'without image' && previewState !== 'with new image' ? grilledCheese : undefined;
    const currentImageUrl = previewState === 'with new image' ? grilledCheese : previewState === 'with modified image' ? grilledCheese2 : undefined;

    return {
        meals: meals,
        mealToEdit: meals[1],
        originalImageUrl: originalImageUrl,
        currentImageUrl: currentImageUrl ?? originalImageUrl
    };
};

function createObservationDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}