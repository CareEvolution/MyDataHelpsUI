import MyDataHelps, { PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, compareDesc, endOfDay, parseISO, startOfDay } from 'date-fns';
import { Meal, MealItem, MealReference } from './types';
import { timestampSortAsc } from './util';
import queryAllFiles from '../query-all-files';
import { createThumbnailIfNecessary } from '../image';
import getDayKey from '../get-day-key';

const parseMeals = (mealsJson: string): Meal[] => {
    return JSON.parse(mealsJson, (key, value) => {
        if (['timestamp', 'archiveTimestamp', 'created', 'lastModified', 'reviewTimestamp'].includes(key) && typeof value === 'string') {
            return parseISO(value);
        }
        return value;
    });
};

const parseMealReference = (mealReferenceJson: string): MealReference => {
    return JSON.parse(mealReferenceJson, (key, value) => {
        if (['date'].includes(key) && typeof value === 'string') {
            return parseISO(value);
        }
        return value;
    });
};

export async function getMeals(date: Date): Promise<Meal[]> {
    const response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'Meals',
        observedAfter: endOfDay(add(date, { days: -1 })).toISOString(),
        observedBefore: startOfDay(add(date, { days: 1 })).toISOString()
    });
    if (response.deviceDataPoints.length > 0) {
        return parseMeals(response.deviceDataPoints[0].value).sort(timestampSortAsc);
    }
    return [];
}

export async function getMealsByDate(startDate: Date, endDate: Date): Promise<Record<string, Meal[]>> {
    const response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'Meals',
        observedAfter: endOfDay(add(startDate, { days: -1 })).toISOString(),
        observedBefore: startOfDay(add(endDate, { days: 1 })).toISOString()
    });
    return response.deviceDataPoints.reduce((mealsByDate, dataPoint) => {
        const dayKey = getDayKey(dataPoint.observationDate!);
        mealsByDate[dayKey] = mealsByDate[dayKey] ?? parseMeals(dataPoint.value).sort(timestampSortAsc);
        return mealsByDate;
    }, {} as Record<string, Meal[]>);
}

export function saveMeals(date: Date, meals: Meal[]): Promise<void> {
    const mealsDataPoint: PersistableDeviceDataPoint = {
        type: 'Meals',
        observationDate: startOfDay(date).toISOString(),
        value: JSON.stringify(meals)
    };
    return MyDataHelps.persistDeviceData([mealsDataPoint]);
}

export function prepareMealForEditing(meal: Meal): Promise<void> {
    const mealReference: MealReference = { date: startOfDay(meal.timestamp), id: meal.id };
    return MyDataHelps.persistDeviceData([{ type: 'MealToEdit', value: JSON.stringify(mealReference) }]);
}

export async function getMealToEdit(): Promise<MealReference | undefined> {
    const response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'MealToEdit'
    });
    if (response.deviceDataPoints.length > 0) {
        return parseMealReference(response.deviceDataPoints[0].value);
    }
    return undefined;
}

export async function uploadMealImageFile(meal: Meal, file: File): Promise<void> {
    const imageFileExtension = file.name.split('.').pop()!;
    if (!imageFileExtension) {
        return Promise.reject();
    }

    await MyDataHelps.uploadFile(file, 'MealImage', `${meal.id}.${imageFileExtension}`);

    const thumbnailFile = await createThumbnailIfNecessary(file);
    if (thumbnailFile) {
        return MyDataHelps.uploadFile(thumbnailFile, 'MealImage', `${meal.id}_thumbnail.${imageFileExtension}`);
    }

    return Promise.resolve();
}

export async function getMealImageUrls(meals: Meal[]): Promise<Record<string, string>> {
    if (meals.length === 0 || !meals.some(meal => meal.hasImage)) return {};

    const mealImageFiles = await queryAllFiles({ category: 'MealImage' });

    mealImageFiles.sort((a, b) => {
        if (a.lastModified === b.lastModified) {
            return a.fileName.includes('thumbnail') ? -1 : b.fileName.includes('thumbnail') ? 1 : 0;
        }
        return compareDesc(parseISO(a.lastModified), parseISO(b.lastModified));
    });

    const result: Record<string, string> = {};
    await Promise.all(meals.filter(meal => meal.hasImage).map(async meal => {
        const imageFile = mealImageFiles.find(file => file.fileName.startsWith(meal.id.toString()));
        if (imageFile) {
            result[meal.id.toString()] = (await MyDataHelps.getFileDownloadUrl(imageFile.key)).preSignedUrl;
        }
    }));

    return result;
}

export function combineItemsWithAnalysisItems(meal: Meal): MealItem[] | undefined {
    if (!meal.analysis) return meal.items;

    const updatedItems = [...(meal.items ?? [])];
    for (const itemToAdd of meal.analysis.items.map(item => item.name)) {
        if (!updatedItems.some(item => item.name.toLowerCase() === itemToAdd.toLowerCase())) {
            updatedItems.push({ name: itemToAdd });
        }
    }

    return updatedItems;
}

export function itemSortByNameAsc(item1: MealItem, item2: MealItem): number {
    return item1.name.localeCompare(item2.name);
}

export function itemSortByConfidenceDesc(item1: MealItem, item2: MealItem): number {
    return (item2.confidenceScore ?? 0) - (item1.confidenceScore ?? 0);
}