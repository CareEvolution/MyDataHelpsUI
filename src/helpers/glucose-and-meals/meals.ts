import MyDataHelps, { Guid, PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, compareDesc, endOfDay, parseISO, startOfDay } from 'date-fns';
import { Meal, MealReference, MealType } from './types';
import { timestampSortAsc } from './util';
import queryAllFiles from '../query-all-files';

interface SerializedMeal {
    id: string,
    timestamp: string;
    type: string;
    description?: string;
    hasImage?: boolean;
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

    await MyDataHelps.uploadFile(file, 'MealImage', `${meal.id}.${imageFileExtension}`);

    const thumbnailFile = await createThumbnailIfNecessary(file);
    if (thumbnailFile) {
        return MyDataHelps.uploadFile(thumbnailFile, 'MealImage', `${meal.id}_thumbnail.${imageFileExtension}`);
    }

    return Promise.resolve();
}

export async function getMealImageUrls(meals: Meal[]): Promise<{ [key: string]: string }> {
    if (meals.length === 0) return {};

    const allMealImageFiles = await queryAllFiles({ category: 'MealImage' });
    const sortedMealImageFiles = allMealImageFiles.sort((a, b) => compareDesc(parseISO(a.lastModified), parseISO(b.lastModified)));

    const result: { [key: string]: string } = {};
    await Promise.all(meals.filter(meal => meal.hasImage).map(async meal => {
        const imageFile = sortedMealImageFiles.find(file => file.fileName.startsWith(`${meal.id}_thumbnail`))
            ?? sortedMealImageFiles.find(file => file.fileName.startsWith(meal.id.toString()));
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
        hasImage: serializedMeal.hasImage,
        archiveTimestamp: serializedMeal.archiveTimestamp ? parseISO(serializedMeal.archiveTimestamp) : undefined
    };
}

function toMealReference(serializedMealReference: SerializedMealReference): MealReference {
    return {
        date: parseISO(serializedMealReference.date),
        id: serializedMealReference.id as Guid
    };
}

async function createThumbnailIfNecessary(file: File): Promise<File | undefined> {
    const thumbnailSize = 300;

    const image = await loadImageFromFile(file);
    const scaleFactor = thumbnailSize / Math.max(image.height, image.width);

    if (scaleFactor < 1) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width * scaleFactor;
        canvas.height = image.height * scaleFactor;

        canvas.getContext('2d')!.drawImage(image, 0, 0, canvas.width, canvas.height);

        return new Promise(resolve => canvas.toBlob(blob => {
            resolve(new File([blob!], file.name, { type: file.type }));
        }, file.type, 1));
    }

    return undefined;
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject();
            image.src = event.target?.result as string;
        };
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

