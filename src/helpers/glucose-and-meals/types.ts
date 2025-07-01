import { Guid } from '@careevolution/mydatahelps-js';
import language from '../language';

export interface Reading {
    timestamp: Date;
    value: number;
}

export interface ReadingRange {
    date: Date;
    min: number;
    max: number;
    average: number;
}

export type MealType = 'meal' | 'snack' | 'drink';

export function getMealTypeDisplayText(mealType: MealType): string {
    if (mealType === 'meal') return language('meal-type-meal');
    if (mealType === 'snack') return language('meal-type-snack');
    if (mealType === 'drink') return language('meal-type-drink');
    return '';
}

export interface MealItem {
    name: string;
    confidenceScore?: number;
}

export interface MealAnalysis {
    timestamp: Date;
    items: MealItem[];
    reviewTimestamp?: Date;
}

export interface Meal {
    id: Guid;
    timestamp: Date;
    type: MealType;
    description?: string;
    hasImage?: boolean;
    items?: MealItem[];
    analysis?: MealAnalysis;
    archiveTimestamp?: Date;
    created?: Date;
    lastModified?: Date;
}

export interface MealReference {
    date: Date;
    id: Guid;
}