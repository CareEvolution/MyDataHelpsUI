export interface Reading {
    timestamp: Date;
    value: number;
}

export type MealType = 'meal' | 'snack' | 'drink';

export interface Meal {
    timestamp: Date;
    type: MealType;
}