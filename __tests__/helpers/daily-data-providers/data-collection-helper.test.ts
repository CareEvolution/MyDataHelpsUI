import { describe, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings } from '../../fixtures/daily-data-providers';
import createDataCollectionHelper from '../../../src/helpers/daily-data-providers/data-collection-helper';
import { DataCollectionSettings, DeviceDataNamespace, DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';

type DataCollectionSettingsEnabledPropertyPrefixes<T> = T extends `${infer P}Enabled` ? P : never;
type ProviderName = DataCollectionSettingsEnabledPropertyPrefixes<keyof DataCollectionSettings>;

describe('Data Collection Helper Tests', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('canQueryV1', () => {
        it('Project - Should return "true".', async () => {
            const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();

            const dataCollectionHelper = createDataCollectionHelper(combinedDataCollectionSettings);

            expect(dataCollectionHelper.canQueryV1('Project', 'AnyType')).toBe(true);
        });

        describe.each([
            { title: 'Air Quality', providerName: 'airQuality', queryNamespace: 'AirNowApi' },
            { title: 'Apple Health', providerName: 'appleHealth', queryNamespace: 'AppleHealth' },
            { title: 'Fitbit', providerName: 'fitbit', queryNamespace: 'Fitbit' },
            { title: 'Garmin', providerName: 'garmin', queryNamespace: 'Garmin' },
            { title: 'Google Fit', providerName: 'googleFit', queryNamespace: 'GoogleFit' },
            { title: 'Omron', providerName: 'omron', queryNamespace: 'Omron' },
            { title: 'Weather', providerName: 'weather', queryNamespace: 'WeatherBit' },
        ] as {
            title: string,
            providerName: ProviderName,
            queryNamespace: Exclude<DeviceDataNamespace, 'Project'>
        }[])('$title', ({ providerName, queryNamespace }) => {
            test.each([
                { title: 'Disabled', providerName, providerEnabled: false, queryNamespace, queryTypes: 'Any Type', expected: false },
                { title: 'Unsupported Type', providerName, providerEnabled: true, queryNamespace, queryTypes: 'Unsupported Type', expected: false },
                { title: 'Supported Type', providerName, providerEnabled: true, queryNamespace, queryTypes: 'Supported Type', expected: true }
            ] as {
                title: string,
                providerName: ProviderName,
                providerEnabled: boolean,
                queryNamespace: Exclude<DeviceDataNamespace, 'Project'>,
                queryTypes: string | string[],
                expected: boolean
            }[])('$title - Should return "$expected".', ({ providerName, providerEnabled, queryNamespace, queryTypes, expected }) => {
                const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();
                combinedDataCollectionSettings.settings[`${providerName}Enabled`] = providerEnabled;
                if (providerEnabled) {
                    combinedDataCollectionSettings.settings.queryableDeviceDataTypes.push({ namespace: queryNamespace, type: 'Supported Type' });
                }

                const dataCollectionHelper = createDataCollectionHelper(combinedDataCollectionSettings);

                expect(dataCollectionHelper.canQueryV1(queryNamespace, queryTypes)).toBe(expected);
            });
        });
    });

    describe('canQueryV2', () => {
        describe.each([
            { title: 'Apple Health', providerName: 'appleHealth', queryNamespace: 'AppleHealth' },
            { title: 'Fitbit', providerName: 'fitbit', queryNamespace: 'Fitbit' },
            { title: 'Garmin', providerName: 'garmin', queryNamespace: 'Garmin' },
            { title: 'Health Connect', providerName: 'healthConnect', queryNamespace: 'HealthConnect' },
            { title: 'Dexcom', providerName: 'dexcom', queryNamespace: 'Dexcom' },
            { title: 'Oura', providerName: 'oura', queryNamespace: 'Oura' }
        ] as {
            title: string,
            providerName: ProviderName,
            queryNamespace: DeviceDataV2Namespace
        }[])('$title', ({ providerName, queryNamespace }) => {
            test.each([
                { title: 'Disabled', providerName, providerEnabled: false, queryNamespace, queryTypes: 'Any Type', expected: false },
                { title: 'Unsupported Type', providerName, providerEnabled: true, queryNamespace, queryTypes: 'Unsupported Type', expected: false },
                { title: 'Supported Type', providerName, providerEnabled: true, queryNamespace, queryTypes: 'Supported Type', expected: true }
            ] as {
                title: string,
                providerName: ProviderName,
                providerEnabled: boolean,
                queryNamespace: DeviceDataV2Namespace,
                queryTypes: string | string[],
                expected: boolean
            }[])('$title - Should return "$expected".', ({ providerName, providerEnabled, queryNamespace, queryTypes, expected }) => {
                const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();
                combinedDataCollectionSettings.settings[`${providerName}Enabled`] = providerEnabled;
                if (providerEnabled) {
                    combinedDataCollectionSettings.deviceDataV2Types.push({ namespace: queryNamespace, type: 'Supported Type', enabled: true });
                }

                const dataCollectionHelper = createDataCollectionHelper(combinedDataCollectionSettings);

                expect(dataCollectionHelper.canQueryV2(queryNamespace, queryTypes)).toBe(expected);
            });
        });
    });
});
