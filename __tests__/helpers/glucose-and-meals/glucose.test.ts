import { beforeEach, describe, expect, it } from '@jest/globals';
import * as readingsModule from '../../../src/helpers/glucose-and-meals/readings';
import { CombinedDataCollectionSettings } from '../../../src/helpers/daily-data-providers/combined-data-collection-settings';
import { DataCollectionSettings, DeviceDataNamespace, DeviceDataV2Namespace, QueryableDeviceDataType } from '@careevolution/mydatahelps-js';
import { checkForGlucoseReadings, computeBestFitGlucoseValue, computeGlucoseReadingRanges, computeGlucoseReadingRecentAverage, getGlucoseReadings } from '../../../src/helpers/glucose-and-meals/glucose';
import { Reading } from '../../../src/helpers/glucose-and-meals/types';
import { add, isEqual, startOfToday } from 'date-fns';

describe('Glucose Helper Function Tests', () => {
    const startDate = add(startOfToday(), { days: -7 });
    const endDate = startOfToday();

    const checkForReadingsMock = jest.spyOn(readingsModule, 'checkForReadings');
    const checkForV2ReadingsMock = jest.spyOn(readingsModule, 'checkForV2Readings');
    const queryForReadingsMock = jest.spyOn(readingsModule, 'queryForReadings');
    const queryForV2ReadingsMock = jest.spyOn(readingsModule, 'queryForV2Readings');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('checkForGlucoseReadings', () => {
        it('Should return false when data sources are not enabled.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {} as DataCollectionSettings,
                deviceDataV2Types: []
            };

            const hasAnyReadings = await checkForGlucoseReadings(combinedDataCollectionSettings);

            expect(hasAnyReadings).toBe(false);

            expect(checkForReadingsMock).not.toHaveBeenCalled();
            expect(checkForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return false when data types are not enabled.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    appleHealthEnabled: true,
                    googleFitEnabled: true,
                    healthConnectEnabled: true,
                    queryableDeviceDataTypes: [] as QueryableDeviceDataType[],
                } as DataCollectionSettings,
                deviceDataV2Types: []
            };

            const hasAnyReadings = await checkForGlucoseReadings(combinedDataCollectionSettings);

            expect(hasAnyReadings).toBe(false);

            expect(checkForReadingsMock).not.toHaveBeenCalled();
            expect(checkForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return false when Apple Health is enabled, but no data exists.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    appleHealthEnabled: true,
                    queryableDeviceDataTypes: [{ namespace: 'AppleHealth', type: 'BloodGlucose' }],
                } as DataCollectionSettings,
                deviceDataV2Types: []
            };

            checkForReadingsMock.mockImplementation(async (namespace, type) => {
                return !(namespace === 'AppleHealth' && type === 'BloodGlucose');
            });

            const hasAnyReadings = await checkForGlucoseReadings(combinedDataCollectionSettings);

            expect(hasAnyReadings).toBe(false);

            expect(checkForReadingsMock).toHaveBeenCalledTimes(1);
            expect(checkForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return true when Apple Health is enabled, and data exists.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    appleHealthEnabled: true,
                    queryableDeviceDataTypes: [{ namespace: 'AppleHealth', type: 'BloodGlucose' }],
                } as DataCollectionSettings,
                deviceDataV2Types: []
            };

            checkForReadingsMock.mockImplementation(async (namespace, type) => {
                return namespace === 'AppleHealth' && type === 'BloodGlucose';
            });

            const hasAnyReadings = await checkForGlucoseReadings(combinedDataCollectionSettings);

            expect(hasAnyReadings).toBe(true);

            expect(checkForReadingsMock).toHaveBeenCalledTimes(1);
            expect(checkForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return false when Google Fit is enabled, but no data exists.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    googleFitEnabled: true,
                    queryableDeviceDataTypes: [{ namespace: 'GoogleFit', type: 'BloodGlucose' }],
                } as DataCollectionSettings,
                deviceDataV2Types: []
            };

            checkForReadingsMock.mockImplementation(async (namespace, type) => {
                return !(namespace === 'GoogleFit' && type === 'BloodGlucose');
            });

            const hasAnyReadings = await checkForGlucoseReadings(combinedDataCollectionSettings);

            expect(hasAnyReadings).toBe(false);

            expect(checkForReadingsMock).toHaveBeenCalledTimes(1);
            expect(checkForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return true when Google Fit is enabled, and data exists.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    googleFitEnabled: true,
                    queryableDeviceDataTypes: [{ namespace: 'GoogleFit', type: 'BloodGlucose' }],
                } as DataCollectionSettings,
                deviceDataV2Types: []
            };

            checkForReadingsMock.mockImplementation(async (namespace, type) => {
                return namespace === 'GoogleFit' && type === 'BloodGlucose';
            });

            const hasAnyReadings = await checkForGlucoseReadings(combinedDataCollectionSettings);

            expect(hasAnyReadings).toBe(true);

            expect(checkForReadingsMock).toHaveBeenCalledTimes(1);
            expect(checkForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return false when Health Connect is enabled, but no data exists.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: { healthConnectEnabled: true } as DataCollectionSettings,
                deviceDataV2Types: [{ namespace: 'HealthConnect', type: 'blood-glucose', enabled: true }]
            };

            checkForV2ReadingsMock.mockImplementation(async (namespace, type) => {
                return !(namespace === 'HealthConnect' && type === 'blood-glucose');
            });

            const hasAnyReadings = await checkForGlucoseReadings(combinedDataCollectionSettings);

            expect(hasAnyReadings).toBe(false);

            expect(checkForReadingsMock).not.toHaveBeenCalled();
            expect(checkForV2ReadingsMock).toHaveBeenCalledTimes(1);
        });

        it('Should return true when Health Connect is enabled, and data exists.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: { healthConnectEnabled: true } as DataCollectionSettings,
                deviceDataV2Types: [{ namespace: 'HealthConnect', type: 'blood-glucose', enabled: true }]
            };

            checkForV2ReadingsMock.mockImplementation(async (namespace, type) => {
                return namespace === 'HealthConnect' && type === 'blood-glucose';
            });

            const hasAnyReadings = await checkForGlucoseReadings(combinedDataCollectionSettings);

            expect(hasAnyReadings).toBe(true);

            expect(checkForReadingsMock).not.toHaveBeenCalled();
            expect(checkForV2ReadingsMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('getGlucoseReadings', () => {
        it('Should return an empty array when data sources are not enabled.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {} as DataCollectionSettings,
                deviceDataV2Types: []
            };

            const readings = await getGlucoseReadings(startDate, endDate, combinedDataCollectionSettings);

            expect(readings).toEqual([]);

            expect(queryForReadingsMock).not.toHaveBeenCalled();
            expect(queryForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return an empty array when data types are not enabled.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    appleHealthEnabled: true,
                    googleFitEnabled: true,
                    healthConnectEnabled: true,
                    queryableDeviceDataTypes: [] as QueryableDeviceDataType[],
                } as DataCollectionSettings,
                deviceDataV2Types: []
            };

            const readings = await getGlucoseReadings(startDate, endDate, combinedDataCollectionSettings);

            expect(readings).toEqual([]);

            expect(queryForReadingsMock).not.toHaveBeenCalled();
            expect(queryForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return readings from Apple Health, when enabled.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    appleHealthEnabled: true,
                    queryableDeviceDataTypes: [{ namespace: 'AppleHealth', type: 'BloodGlucose' }],
                } as DataCollectionSettings,
                deviceDataV2Types: []
            };

            const reading: Reading = { timestamp: add(startDate, { hours: 12 }), value: 100 };
            queryForReadingsMock.mockImplementation(async (actualNamespace: DeviceDataNamespace, actualType: string, actualStartDate: Date, actualEndDate: Date) => {
                if (actualNamespace !== 'AppleHealth') return [];
                if (actualType !== 'BloodGlucose') return [];
                if (!isEqual(actualStartDate, startDate)) return [];
                if (!isEqual(actualEndDate, endDate)) return [];
                return [reading];
            });

            const readings = await getGlucoseReadings(startDate, endDate, combinedDataCollectionSettings);

            expect(readings).toEqual([reading]);

            expect(queryForReadingsMock).toHaveBeenCalledTimes(1);
            expect(queryForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return readings from Google Fit, when enabled.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    googleFitEnabled: true,
                    queryableDeviceDataTypes: [{ namespace: 'GoogleFit', type: 'BloodGlucose' }] as QueryableDeviceDataType[],
                } as DataCollectionSettings,
                deviceDataV2Types: []
            };

            const reading: Reading = { timestamp: add(startDate, { hours: 12 }), value: 101 };
            queryForReadingsMock.mockImplementation(async (actualNamespace: DeviceDataNamespace, actualType: string, actualStartDate: Date, actualEndDate: Date) => {
                if (actualNamespace !== 'GoogleFit') return [];
                if (actualType !== 'BloodGlucose') return [];
                if (!isEqual(actualStartDate, startDate)) return [];
                if (!isEqual(actualEndDate, endDate)) return [];
                return [reading];
            });

            const readings = await getGlucoseReadings(startDate, endDate, combinedDataCollectionSettings);

            expect(readings).toEqual([reading]);

            expect(queryForReadingsMock).toHaveBeenCalledTimes(1);
            expect(queryForV2ReadingsMock).not.toHaveBeenCalled();
        });

        it('Should return readings from Health Connect, when enabled.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: { healthConnectEnabled: true } as DataCollectionSettings,
                deviceDataV2Types: [{ namespace: 'HealthConnect', type: 'blood-glucose', enabled: true }]
            };

            const reading: Reading = { timestamp: add(startDate, { hours: 12 }), value: 102 };
            queryForV2ReadingsMock.mockImplementation(async (actualNamespace: DeviceDataV2Namespace, actualType: string, actualStartDate: Date, actualEndDate: Date) => {
                if (actualNamespace !== 'HealthConnect') return [];
                if (actualType !== 'blood-glucose') return [];
                if (!isEqual(actualStartDate, startDate)) return [];
                if (!isEqual(actualEndDate, endDate)) return [];
                return [reading];
            });

            const readings = await getGlucoseReadings(startDate, endDate, combinedDataCollectionSettings);

            expect(readings).toEqual([reading]);

            expect(queryForReadingsMock).not.toHaveBeenCalled();
            expect(queryForV2ReadingsMock).toHaveBeenCalledTimes(1);
        });

        it('Should return combined readings.', async () => {
            const combinedDataCollectionSettings: CombinedDataCollectionSettings = {
                settings: {
                    appleHealthEnabled: true,
                    googleFitEnabled: true,
                    healthConnectEnabled: true,
                    queryableDeviceDataTypes: [
                        { namespace: 'AppleHealth', type: 'BloodGlucose' },
                        { namespace: 'GoogleFit', type: 'BloodGlucose' }
                    ],
                } as DataCollectionSettings,
                deviceDataV2Types: [{ namespace: 'HealthConnect', type: 'blood-glucose', enabled: true }]
            };

            queryForReadingsMock.mockImplementation(async (actualNamespace: DeviceDataNamespace, actualType: string, actualStartDate: Date, actualEndDate: Date) => {
                if (actualNamespace !== 'AppleHealth' && actualNamespace !== 'GoogleFit') return [];
                if (actualType !== 'BloodGlucose') return [];
                if (!isEqual(actualStartDate, startDate)) return [];
                if (!isEqual(actualEndDate, endDate)) return [];

                return actualNamespace === 'AppleHealth'
                    ? [{ timestamp: add(startDate, { hours: 12, minutes: 15 }), value: 100 }]
                    : [{ timestamp: add(startDate, { hours: 12, minutes: 15 }), value: 101 }, { timestamp: add(startDate, { hours: 12, minutes: 30 }), value: 201 }];
            });
            queryForV2ReadingsMock.mockImplementation(async (actualNamespace: DeviceDataV2Namespace, actualType: string, actualStartDate: Date, actualEndDate: Date) => {
                if (actualNamespace !== 'HealthConnect') return [];
                if (actualType !== 'blood-glucose') return [];
                if (!isEqual(actualStartDate, startDate)) return [];
                if (!isEqual(actualEndDate, endDate)) return [];
                return [
                    { timestamp: add(startDate, { hours: 12, minutes: 15 }), value: 102 },
                    { timestamp: add(startDate, { hours: 12, minutes: 30 }), value: 202 },
                    { timestamp: add(startDate, { hours: 12, minutes: 45 }), value: 302 }
                ];
            });

            const readings = await getGlucoseReadings(startDate, endDate, combinedDataCollectionSettings);

            expect(readings).toEqual([
                { timestamp: add(startDate, { hours: 12, minutes: 15 }), value: 100 },
                { timestamp: add(startDate, { hours: 12, minutes: 30 }), value: 201 },
                { timestamp: add(startDate, { hours: 12, minutes: 45 }), value: 302 },
            ]);

            expect(queryForReadingsMock).toHaveBeenCalledTimes(2);
            expect(queryForV2ReadingsMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('computeBestFitGlucoseValue', () => {
        const readings: Reading[] = [
            { timestamp: add(startDate, { hours: 12 }), value: 100 },
            { timestamp: add(startDate, { hours: 15 }), value: 130 },
            { timestamp: add(startDate, { hours: 18 }), value: 70 }
        ];

        it('Should return the exact value when the observation time matches a reading.', () => {
            expect(computeBestFitGlucoseValue(add(startDate, { hours: 12 }), readings)).toBe(100);
            expect(computeBestFitGlucoseValue(add(startDate, { hours: 15 }), readings)).toBe(130);
            expect(computeBestFitGlucoseValue(add(startDate, { hours: 18 }), readings)).toBe(70);
        });

        it('Should compute the best fit value when the observation time is between two readings', () => {
            expect(computeBestFitGlucoseValue(add(startDate, { hours: 13 }), readings)).toBe(110);
            expect(computeBestFitGlucoseValue(add(startDate, { hours: 17 }), readings)).toBe(90);
        });
    });

    describe('computeGlucoseReadingRanges', () => {
        it('Should compute reading ranges by day.', () => {
            const readings: Reading[] = [
                { timestamp: add(startDate, { hours: 10 }), value: 100 },
                { timestamp: add(startDate, { hours: 12 }), value: 120 },
                { timestamp: add(startDate, { hours: 14 }), value: 116 },
                { timestamp: add(startDate, { days: 1, hours: 10 }), value: 95 },
                { timestamp: add(startDate, { days: 1, hours: 16 }), value: 130 }
            ];

            const ranges = computeGlucoseReadingRanges(readings);

            expect(ranges).toEqual([
                { date: startDate, min: 100, max: 120, average: 112 },
                { date: add(startDate, { days: 1 }), min: 95, max: 130, average: 112.5 }
            ]);
        });
    });

    describe('computeGlucoseReadingRecentAverage', () => {
        it('Should return undefined if no readings fall within the date range.', () => {
            const readings: Reading[] = [
                { timestamp: add(startDate, { seconds: -1 }), value: 230 },
                { timestamp: endDate, value: 230 }
            ];

            const average = computeGlucoseReadingRecentAverage(readings, endDate, 7);

            expect(average).toBeUndefined();
        });

        it('Should compute the average for readings within the date range.', () => {
            const readings: Reading[] = [
                { timestamp: add(startDate, { seconds: -1 }), value: 230 },
                { timestamp: startDate, value: 100 },
                { timestamp: add(startDate, { hours: 12 }), value: 120 },
                { timestamp: endDate, value: 230 }
            ];

            const average = computeGlucoseReadingRecentAverage(readings, endDate, 7);

            expect(average).toBe(110);
        });
    });
});
