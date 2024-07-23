import MyDataHelps from '@careevolution/mydatahelps-js';
import { isSameDay } from 'date-fns';
import { Meal } from './types';
import { timestampSortAsc } from './util';

export async function getMeals(date: Date): Promise<Meal[]> {
    let response = await MyDataHelps.queryDeviceData({ namespace: 'Project', type: 'Meals' });
    if (!response?.deviceDataPoints.length) return [];

    let meals = JSON.parse(response.deviceDataPoints[0].value) as Meal[];
    let filteredMeals = meals.filter(meal => isSameDay(meal.timestamp, date));
    return filteredMeals.sort(timestampSortAsc);
}

export function prepareMealForEditing(meal: Meal): Promise<void> {
    return MyDataHelps.persistDeviceData([{ type: 'MDHUI-MealToEdit', value: JSON.stringify(meal) }]);
}