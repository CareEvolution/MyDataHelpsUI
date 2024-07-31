import { Guid } from '@careevolution/mydatahelps-js';
import language from '../language';

export interface Reading {
    timestamp: Date;
    value: number;
}

export type MealType = 'meal' | 'snack' | 'drink';

export function getMealTypeDisplayText(mealType: MealType): string {
    if (mealType === 'meal') return language('meal-type-meal');
    if (mealType === 'snack') return language('meal-type-snack');
    if (mealType === 'drink') return language('meal-type-drink');
    return '';
}

export interface Meal {
    id: Guid;
    timestamp: Date;
    type: MealType;
}

export interface SerializedMeal {
    id: string,
    timestamp: string;
    type: string;
}