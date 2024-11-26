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
    archiveTimestamp?: string;
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
        const meals = (JSON.parse(response.deviceDataPoints[0].value) as SerializedMeal[]).map(toMeal);
        return meals.filter(meal => !meal.archiveTimestamp).sort(timestampSortAsc);
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

export async function uploadMealImageFile(meal: Meal, file: File): Promise<void> {
    const imageFileExtension = file.name.split('.').pop()!;

    const originalImageFile = renameImage(file, `${meal.id}.${imageFileExtension}`);
    await MyDataHelps.uploadFile(originalImageFile, 'MealImage');

    const thumbnailImageFile = await createThumbnailImage(file, `${meal.id}_thumbnail.${imageFileExtension}`);
    return MyDataHelps.uploadFile(thumbnailImageFile, 'MealImage');
}

export async function getMealImageUrls(meals: Meal[]): Promise<{ [key: string]: string }> {
    if (meals.length === 0) return {};

    const allMealImageFiles = await queryAllFiles({ category: 'MealImage' });
    const sortedMealImageFiles = allMealImageFiles.sort((a, b) => compareDesc(parseISO(a.lastModified), parseISO(b.lastModified)));

    const result: { [key: string]: string } = {};
    await Promise.all(meals.map(async meal => {
        // @ts-ignore - fileName exists, but just isn't in the MDH-JS type yet.
        const imageFile = sortedMealImageFiles.find(file => file.fileName.startsWith(`${meal.id}_thumbnail`))
            // @ts-ignore
            ?? sortedMealImageFiles.find(file => file.fileName.startsWith(meal.id));
        if (imageFile) {
            result[meal.id.toString()] = (await MyDataHelps.getFileDownloadUrl(imageFile.key)).preSignedUrl;
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
        archiveTimestamp: serializedMeal.archiveTimestamp ? parseISO(serializedMeal.archiveTimestamp) : undefined
    };
}

function toMealReference(serializedMealReference: SerializedMealReference): MealReference {
    return {
        date: parseISO(serializedMealReference.date),
        id: serializedMealReference.id as Guid
    };
}

function renameImage(file: File, fileName: string): File {
    return new File([file], fileName, { type: file.type });
}

async function createThumbnailImage(file: File, fileName: string): Promise<File> {
    const maxThumbnailSize = 300;

    const bitmap = await createImageBitmap(file);
    const ratio = maxThumbnailSize / Math.max(bitmap.height, bitmap.width);

    if (ratio >= 1) {
        return renameImage(file, fileName);
    }

    const newWidth = bitmap.width * ratio;
    const newHeight = bitmap.height * ratio;

    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    const context = canvas.getContext('2d');
    context!.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newWidth, newHeight);

    return new Promise(resolve => canvas.toBlob(blob => {
        resolve(new File([blob!], fileName, { type: file.type }));
    }, file.type, 1));
}