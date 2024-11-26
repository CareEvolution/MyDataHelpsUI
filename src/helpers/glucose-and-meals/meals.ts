import MyDataHelps, { Guid, PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, compareDesc, endOfDay, parseISO, startOfDay } from 'date-fns';
import { Meal, MealReference, MealType } from './types';
import { timestampSortAsc } from './util';
import queryAllFiles from "../query-all-files";

interface SerializedMeal {
    id: string,
    timestamp: string;
    type: string;
    description?: string;
    imageFileName?: string;
}

interface SerializedMealReference {
    date: string;
    id: string;
}

export async function getMeals(date: Date): Promise<Meal[]> {
    const response = await MyDataHelps.queryDeviceData({
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
        return toMealReference(JSON.parse(response.deviceDataPoints[0].value) as SerializedMealReference);
    }
    return undefined;
}

export async function uploadMealImageFile(file: File): Promise<void> {
    const resizedFile = await resizeImage(file, 400);
    return MyDataHelps.uploadFile(resizedFile, 'MealImage');
}

export async function getMealImageUrls(fileNames: string[]): Promise<{ [key: string]: string }> {
    if (fileNames.length === 0) return {};

    const allMealImageFiles = await queryAllFiles({ category: 'MealImage' });
    const sortedMealImageFiles = allMealImageFiles.sort((a, b) => compareDesc(parseISO(a.lastModified), parseISO(b.lastModified)));

    const result: { [key: string]: string } = {};
    await Promise.all(fileNames.map(async fileName => {
        // @ts-ignore - fileName exists, but just isn't in the MDH-JS type yet.
        const imageFile = sortedMealImageFiles.find(file => file.fileName === fileName);
        if (imageFile) {
            result[fileName] = (await MyDataHelps.getFileDownloadUrl(imageFile.key)).preSignedUrl;
        }
    }));

    return result;
}

function toMeal(serializedMeal: SerializedMeal): Meal {
    return {
        id: serializedMeal.id as Guid,
        timestamp: parseISO(serializedMeal.timestamp),
        type: serializedMeal.type as MealType,
        description: serializedMeal.description,
        imageFileName: serializedMeal.imageFileName
    };
}

function toMealReference(serializedMealReference: SerializedMealReference): MealReference {
    return {
        date: parseISO(serializedMealReference.date),
        id: serializedMealReference.id as Guid
    };
}

async function resizeImage(file: File, maxSize: number): Promise<File> {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const bitmap = await createImageBitmap(file);
    const ratio = maxSize / Math.max(bitmap.height, bitmap.width);
    const newWidth = bitmap.width * ratio;
    const newHeight = bitmap.height * ratio;

    canvas.width = newWidth;
    canvas.height = newHeight;
    context!.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newWidth, newHeight);

    return new Promise(resolve => canvas.toBlob(blob => {
        resolve(new File([blob!], file.name, { type: file.type }));
    }, file.type, 1));
}