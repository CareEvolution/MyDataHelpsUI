import MyDataHelps, { Guid, PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, endOfDay, parseISO, startOfDay } from 'date-fns';
import { Meal, MealType, SerializedMeal } from './types';
import { timestampSortAsc } from './util';

export async function getMeals(date: Date): Promise<Meal[]> {
    let response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'Meals',
        observedAfter: endOfDay(add(date, { days: -1 })).toISOString(),
        observedBefore: startOfDay(add(date, { days: 1 })).toISOString()
    });
    if (response.deviceDataPoints.length > 0) {
        return (JSON.parse(response.deviceDataPoints[0].value) as SerializedMeal[]).map(toMeal).sort(timestampSortAsc);
    }
    return [];
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
    if (response.deviceDataPoints.length > 0) {
        return toMeal(JSON.parse(response.deviceDataPoints[0].value) as SerializedMeal);
    }
    return undefined;
}

function toMeal(serializedMeal: SerializedMeal): Meal {
    return {
        id: serializedMeal.id as Guid,
        timestamp: parseISO(serializedMeal.timestamp),
        type: serializedMeal.type as MealType,
        description: serializedMeal.description
    };
}