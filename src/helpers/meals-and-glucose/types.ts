import { Guid } from "@careevolution/mydatahelps-js";

export interface Reading {
    timestamp: Date;
    value: number;
}

export type MealType = 'meal' | 'snack' | 'drink';

export interface Meal {
    id?: Guid;
    timestamp: Date;
    type: MealType;
}