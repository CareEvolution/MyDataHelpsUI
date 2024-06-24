export interface Reading {
    timestamp: Date;
    value: number;
    source?: string;
}

export interface MealNutrient {
    total: number;
    values: number[];
    units?: string;
}

export interface Meal {
    observationDate: Date;
    nutrients: { [key: string]: MealNutrient };
    minGlucose?: number;
    maxGlucose?: number;
}