import MyDataHelps from '@careevolution/mydatahelps-js';
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

export function prepareMealForEditing(meal: Meal): Promise<void> {
    return MyDataHelps.persistDeviceData([{ type: 'MDHUI-MealToEdit', value: JSON.stringify(meal) }]);
}