import { add, endOfDay, startOfDay, startOfToday } from 'date-fns';
import { describe, it } from '@jest/globals';
import { getMealImageUrls, getMeals, getMealToEdit, Meal, MealReference, prepareMealForEditing, saveMeals, uploadMealImageFile } from '../../../src/helpers/glucose-and-meals';
import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataPointsPage, DownloadedFile, Guid, UploadedFile, UploadedFileQuery } from '@careevolution/mydatahelps-js';
import { v4 as uuid } from 'uuid';
import * as image from '../../../src/helpers/image';
import * as queryAllFiles from '../../../src/helpers/query-all-files';

jest.mock('@careevolution/mydatahelps-js', () => {
    return {
        __esModule: true,
        default: {
            queryDeviceData: jest.fn(),
            persistDeviceData: jest.fn(),
            uploadFile: jest.fn(),
            getFileDownloadUrl: jest.fn()
        }
    }
});

describe('Meals - Helper Function Tests', () => {
    const today = startOfToday();

    describe('Get Meals', () => {
        const queryDeviceData = (MyDataHelps.queryDeviceData as jest.Mock);

        beforeEach(() => {
            queryDeviceData.mockReset();
        });

        const setupMeals = (meals?: Meal[]) => {
            const expectedQueryParameters = {
                namespace: 'Project',
                type: 'Meals',
                observedAfter: endOfDay(add(today, { days: -1 })).toISOString(),
                observedBefore: startOfDay(add(today, { days: 1 })).toISOString()
            };

            queryDeviceData.mockImplementation((queryParameters: DeviceDataPointQuery): Promise<DeviceDataPointsPage> => {
                const dataPoints: DeviceDataPoint[] = [];
                if (meals && JSON.stringify(queryParameters) === JSON.stringify(expectedQueryParameters)) {
                    dataPoints.push({ value: JSON.stringify(meals) } as DeviceDataPoint);
                }
                return Promise.resolve({ deviceDataPoints: dataPoints });
            });
        };

        it('Should return all meals for the given date in ascending timestamp order.', async () => {
            const mealWithDescription: Meal = {
                id: uuid(),
                timestamp: add(today, { hours: 12 }),
                type: 'meal',
                description: 'Some tasty food!',
                created: add(today, { hours: 13 })
            };
            const archivedMeal: Meal = {
                id: uuid(),
                timestamp: add(today, { hours: 11 }),
                type: 'snack',
                archiveTimestamp: add(today, { hours: 11, minutes: 30 })
            };
            const mealWithImage: Meal = {
                id: uuid(),
                timestamp: add(today, { hours: 10 }),
                type: 'drink',
                hasImage: true,
                lastModified: add(today, { hours: 16 })
            };
            const mealWithAnalysis: Meal = {
                id: uuid(),
                timestamp: add(today, { hours: 14 }),
                type: 'meal',
                hasImage: true,
                items: [{ name: 'eggs' }, { name: 'bacon' }, { name: 'toast' }, { name: 'sausage' }],
                analysis: {
                    timestamp: add(today, { hours: 14, minutes: 30 }),
                    items: [{ name: 'eggs', confidenceScore: 0.89 }, { name: 'bacon', confidenceScore: 0.95 }, { name: 'toast', confidenceScore: 0.7 }],
                    reviewTimestamp: add(today, { hours: 16, minutes: 22 })
                },
                created: add(today, { hours: 14, minutes: 10 }),
                lastModified: add(today, { hours: 14, minutes: 45 })
            };
            const mealWithItems: Meal = {
                id: uuid(),
                timestamp: add(today, { hours: 13 }),
                type: 'meal',
                items: [{ name: 'bread' }, { name: 'cheese' }],
                created: add(today, { hours: 13, minutes: 5 }),
                lastModified: add(today, { hours: 13, minutes: 5 })
            };

            setupMeals([mealWithDescription, archivedMeal, mealWithImage, mealWithAnalysis, mealWithItems]);

            const meals = await getMeals(today);

            expect(meals.length).toBe(5);
            expect(meals[0]).toEqual(mealWithImage);
            expect(meals[1]).toEqual(archivedMeal);
            expect(meals[2]).toEqual(mealWithDescription);
            expect(meals[3]).toEqual(mealWithItems);
            expect(meals[4]).toEqual(mealWithAnalysis);
        });

        it('Should return an empty array when there are no meals.', async () => {
            setupMeals();

            const meals = await getMeals(today);

            expect(meals.length).toBe(0);
        });
    });

    describe('Save Meals', () => {
        const persistDeviceData = (MyDataHelps.persistDeviceData as jest.Mock);

        beforeEach(() => {
            persistDeviceData.mockReset();
        });

        it('Should save all meals.', async () => {
            const allMeals: Meal[] = [
                { id: uuid() as Guid } as Meal,
                { id: uuid() as Guid } as Meal
            ];

            await saveMeals(add(today, { hours: 14 }), allMeals);

            expect(persistDeviceData).toHaveBeenCalledTimes(1);
            expect(persistDeviceData).toHaveBeenCalledWith([{
                type: 'Meals',
                observationDate: startOfDay(today).toISOString(),
                value: JSON.stringify(allMeals)
            }]);
        });
    });

    describe('Prepare Meal For Editing', () => {
        const persistDeviceData = (MyDataHelps.persistDeviceData as jest.Mock);

        beforeEach(() => {
            persistDeviceData.mockReset();
        });

        it('Should save a meal reference that can be used to look up the meal for editing.', async () => {
            const meal: Meal = { id: uuid() as Guid, timestamp: add(today, { hours: 12 }) } as Meal;
            const mealReference: MealReference = { date: today, id: meal.id };

            await prepareMealForEditing(meal);

            expect(persistDeviceData).toHaveBeenCalledTimes(1);
            expect(persistDeviceData).toHaveBeenCalledWith([{
                type: 'MealToEdit',
                value: JSON.stringify(mealReference)
            }]);
        });
    });

    describe('Get Meal To Edit', () => {
        const queryDeviceData = (MyDataHelps.queryDeviceData as jest.Mock);

        beforeEach(() => {
            queryDeviceData.mockReset();
        });

        const setupMealReference = (mealReference?: MealReference) => {
            const expectedQueryParameters = {
                namespace: 'Project',
                type: 'MealToEdit'
            };

            queryDeviceData.mockImplementation((queryParameters: DeviceDataPointQuery): Promise<DeviceDataPointsPage> => {
                const dataPoints: DeviceDataPoint[] = [];
                if (mealReference && JSON.stringify(queryParameters) === JSON.stringify(expectedQueryParameters)) {
                    dataPoints.push({ value: JSON.stringify(mealReference) } as DeviceDataPoint);
                }
                return Promise.resolve({ deviceDataPoints: dataPoints });
            });
        };

        it('Should load the meal reference that can be used to look up the meal for editing.', async () => {
            const mealReference: MealReference = { date: today, id: uuid() };

            setupMealReference(mealReference);

            const mealToEdit = await getMealToEdit();

            expect(mealToEdit).toEqual(mealReference);
        });

        it('Should return undefined when there is no meal to edit.', async () => {
            setupMealReference();

            const mealToEdit = await getMealToEdit();

            expect(mealToEdit).toBe(undefined);
        });
    });

    describe('Upload Meal Image File', () => {
        const uploadFile = (MyDataHelps.uploadFile as jest.Mock);

        beforeEach(() => {
            uploadFile.mockReset();
        });

        const setupThumbnailFile = (file?: File) => {
            jest.spyOn(image, 'createThumbnailIfNecessary').mockImplementation(() => Promise.resolve(file));
        };

        it('Should upload just the image file when a thumbnail is not necessary.', async () => {
            const meal: Meal = { id: uuid() as Guid } as Meal;
            const file = { name: 'image.png' } as File;

            setupThumbnailFile();

            await uploadMealImageFile(meal, file);

            expect(uploadFile).toHaveBeenCalledTimes(1);
            expect(uploadFile).toHaveBeenCalledWith(file, 'MealImage', `${meal.id}.png`);
        });

        it('Should upload the image file and a thumbnail, when necessary.', async () => {
            const meal: Meal = { id: uuid() as Guid } as Meal;
            const file = { name: 'image.png' } as File;
            const thumbnailFile = { name: 'thumbnail.png' } as File;

            setupThumbnailFile(thumbnailFile);

            await uploadMealImageFile(meal, file);

            expect(uploadFile).toHaveBeenCalledTimes(2);
            expect(uploadFile).toHaveBeenNthCalledWith(1, file, 'MealImage', `${meal.id}.png`);
            expect(uploadFile).toHaveBeenNthCalledWith(2, thumbnailFile, 'MealImage', `${meal.id}_thumbnail.png`);
        });
    });

    describe('Get Meal Image Urls', () => {
        const getFileDownloadUrl = (MyDataHelps.getFileDownloadUrl as jest.Mock);

        beforeEach(() => {
            getFileDownloadUrl.mockReset();
            getFileDownloadUrl.mockImplementation((key: string): Promise<DownloadedFile> => {
                return Promise.resolve({ preSignedUrl: `${key} url` });
            });
        });

        const setupImageFiles = (imageFiles?: UploadedFile[]) => {
            const expectedQuery: UploadedFileQuery = { category: 'MealImage' };

            jest.spyOn(queryAllFiles, 'default').mockImplementation((query: UploadedFileQuery): Promise<UploadedFile[]> => {
                return imageFiles && JSON.stringify(query) == JSON.stringify(expectedQuery) ? Promise.resolve(imageFiles) : Promise.resolve([]);
            });
        };

        it('Should return the image urls for each meal.', async () => {
            const meal1: Meal = { id: uuid() as Guid, hasImage: true } as Meal;
            const meal2: Meal = { id: uuid() as Guid, hasImage: true } as Meal;

            const meal1ImageFile = { fileName: `${meal1.id}.png`, lastModified: add(today, { hours: 9 }).toISOString(), key: 'image 1' } as UploadedFile;
            const meal2ImageFile = { fileName: `${meal2.id}.png`, lastModified: add(today, { hours: 9 }).toISOString(), key: 'image 2' } as UploadedFile;

            setupImageFiles([meal1ImageFile, meal2ImageFile]);

            const imageUrls = await getMealImageUrls([meal1, meal2]);

            expect(Object.keys(imageUrls).length).toBe(2);
            expect(imageUrls[meal1.id.toString()]).toBe('image 1 url');
            expect(imageUrls[meal2.id.toString()]).toBe('image 2 url');
        });

        it('Should prefer the latest image.', async () => {
            const meal: Meal = { id: uuid() as Guid, hasImage: true } as Meal;

            const imageFile1 = { fileName: `${meal.id}_thumbnail.png`, lastModified: add(today, { hours: 7 }).toISOString(), key: 'image 1' } as UploadedFile;
            const imageFile2 = { fileName: `${meal.id}.png`, lastModified: add(today, { hours: 8 }).toISOString(), key: 'image 2' } as UploadedFile;
            const imageFile3 = { fileName: `${meal.id}_thumbnail.png`, lastModified: add(today, { hours: 9 }).toISOString(), key: 'image 3' } as UploadedFile;
            const imageFile4 = { fileName: `${meal.id}.png`, lastModified: add(today, { hours: 10 }).toISOString(), key: 'image 4' } as UploadedFile;

            setupImageFiles([imageFile1, imageFile2, imageFile3, imageFile4]);

            const imageUrls = await getMealImageUrls([meal]);

            expect(Object.keys(imageUrls).length).toBe(1);
            expect(imageUrls[meal.id.toString()]).toBe('image 4 url');
        });

        it('Should prefer thumbnail images when both are available with the same last modified date.', async () => {
            const meal: Meal = { id: uuid() as Guid, hasImage: true } as Meal;

            const imageFile1 = { fileName: `${meal.id}.png`, lastModified: add(today, { hours: 9 }).toISOString(), key: 'image 1' } as UploadedFile;
            const imageFile2 = { fileName: `${meal.id}_thumbnail.png`, lastModified: add(today, { hours: 9 }).toISOString(), key: 'image 2' } as UploadedFile;

            setupImageFiles([imageFile1, imageFile2]);

            const imageUrls = await getMealImageUrls([meal]);

            expect(Object.keys(imageUrls).length).toBe(1);
            expect(imageUrls[meal.id.toString()]).toBe('image 2 url');
        });

        it('Should return an empty object if there are no meals.', async () => {
            const imageFile1 = { fileName: `${uuid()}.png`, lastModified: add(today, { hours: 9 }).toISOString(), key: 'image 1' } as UploadedFile;
            const imageFile2 = { fileName: `${uuid()}.png`, lastModified: add(today, { hours: 9 }).toISOString(), key: 'image 2' } as UploadedFile;

            setupImageFiles([imageFile1, imageFile2]);

            const imageUrls = await getMealImageUrls([]);

            expect(Object.keys(imageUrls).length).toBe(0);
        });
    });
});
