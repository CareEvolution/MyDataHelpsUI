import MyDataHelps from '@careevolution/mydatahelps-js';
import { compareAsc, isSameDay } from 'date-fns';

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

export async function getMeals(date: Date): Promise<Meal[]> {
    let response = await MyDataHelps.queryDeviceData({namespace: 'Project', type: 'Meals'});
    if (!response?.deviceDataPoints.length) return [];

    let meals = JSON.parse(response.deviceDataPoints[0].value) as Meal[];
    let filteredMeals = meals.filter(meal => isSameDay(meal.observationDate, date));
    return filteredMeals.sort((a, b) => compareAsc(a.observationDate, b.observationDate));
}