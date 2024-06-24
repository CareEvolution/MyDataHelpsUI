export type Reading = {
    timestamp: Date;
    value: number;
    source?: string;
}

export type MealNutrient = {
    total: number;
    values: number[];
    units?: string;
}

export type Meal = {
    observationDate: Date;
    nutrients: { [key: string]: MealNutrient };
    minGlucose?: number;
    maxGlucose?: number;
}