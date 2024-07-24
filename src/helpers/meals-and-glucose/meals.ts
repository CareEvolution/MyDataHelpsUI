import MyDataHelps, { PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, endOfDay, startOfDay } from 'date-fns';
import { Meal } from './types';
import { timestampSortAsc } from './util';

export async function getMeals(date: Date): Promise<Meal[]> {
    let response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'Meals',
        observedAfter: endOfDay(add(date, { days: -1 })).toISOString(),
        observedBefore: startOfDay(add(date, { days: 1 })).toISOString()
    });
    return response.deviceDataPoints.length ? (JSON.parse(response.deviceDataPoints[0].value) as Meal[]).sort(timestampSortAsc) : [];
}

export function saveMeals(date: Date, meals: Meal[]): Promise<void> {
    let mealsDataPoint: PersistableDeviceDataPoint = {
        type: 'Meals',
        observationDate: startOfDay(date).toISOString(),
        value: JSON.stringify(meals)
    };
    return MyDataHelps.persistDeviceData([mealsDataPoint]);
}

export function prepareMealForEditing(meal: Meal): Promise<void> {
    return MyDataHelps.persistDeviceData([{ type: 'MealToEdit', value: JSON.stringify(meal) }]);
}

export async function getMealToEdit(): Promise<Meal | undefined> {
    let response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'MealToEdit'
    });
    return response.deviceDataPoints.length ? (JSON.parse(response.deviceDataPoints[0].value) as Meal) : undefined;
}