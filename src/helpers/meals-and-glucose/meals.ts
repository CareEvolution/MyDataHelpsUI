import MyDataHelps from '@careevolution/mydatahelps-js';
import { compareAsc, isSameDay } from 'date-fns';
import { Meal } from './types';

export async function getMeals(date: Date): Promise<Meal[]> {
    let response = await MyDataHelps.queryDeviceData({ namespace: 'Project', type: 'Meals' });
    if (!response?.deviceDataPoints.length) return [];

    let meals = JSON.parse(response.deviceDataPoints[0].value) as Meal[];
    let filteredMeals = meals.filter(meal => isSameDay(meal.timestamp, date));
    return filteredMeals.sort((a, b) => compareAsc(a.timestamp, b.timestamp));
}
