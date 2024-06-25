export interface Reading {
    timestamp: Date;
    value: number;
    source?: string;
}

export type MealType = 'meal' | 'snack' | 'drink';

export interface Meal {
    timestamp: Date;
    type: MealType;
    description?: string;
}