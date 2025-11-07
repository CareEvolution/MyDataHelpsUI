import { describe, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings } from '../../fixtures/daily-data-providers';
import { getSupportedApis, hasV1Data, hasV2Data } from '../../../src/helpers/daily-data-providers/data-collection-helper';
import MyDataHelps, { DataCollectionSettings, DeviceDataNamespace, DeviceDataPointsPage, DeviceDataV2Namespace, DeviceDataV2Page } from '@careevolution/mydatahelps-js';

type DataCollectionSettingsEnabledPropertyPrefixes<T> = T extends `${infer P}Enabled` ? P : never;
type ProviderName = DataCollectionSettingsEnabledPropertyPrefixes<keyof DataCollectionSettings>;

jest.mock('@careevolution/mydatahelps-js', () => ({
    __esModule: true,
    default: {
        queryDeviceData: jest.fn(),
        queryDeviceDataV2: jest.fn()
    }
}));

describe('Data Collection Helper Function Tests', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('canQuery', () => {
        describe('V1', () => {
            it('Project - Should return a result with v1 enabled with all types and v2 disabled.', async () => {
                const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();

                const result = getSupportedApis(combinedDataCollectionSettings, { namespace: 'Project', types: ['Any Type'], requireAllTypes: false });

                expect(result).toEqual({
                    v1: { enabled: true, types: ['Any Type'] },
                    v2: { enabled: false }
                });
            });

            describe.each([
                { title: 'Air Quality', providerName: 'airQuality', queryNamespace: 'AirNowApi' },
                { title: 'Apple Health', providerName: 'appleHealth', queryNamespace: 'AppleHealth' },
                { title: 'Fitbit', providerName: 'fitbit', queryNamespace: 'Fitbit' },
                { title: 'Garmin', providerName: 'garmin', queryNamespace: 'Garmin' },
                { title: 'Google Fit', providerName: 'googleFit', queryNamespace: 'GoogleFit' },
                { title: 'Omron', providerName: 'omron', queryNamespace: 'Omron' },
                { title: 'Weather', providerName: 'weather', queryNamespace: 'WeatherBit' }
            ] as {
                title: string,
                providerName: ProviderName,
                queryNamespace: Exclude<DeviceDataNamespace, 'Project'>
            }[])('$title', ({ providerName, queryNamespace }) => {
                test.each([
                    { title: 'Disabled Provider - Should return a result with v1 and v2 disabled.', providerName, providerEnabled: false, queryNamespace, queryTypes: ['Any Type'], expected: false },
                    { title: 'Unsupported Type - Should return a result with v1 and v2 disabled.', providerName, providerEnabled: true, queryNamespace, queryTypes: ['Unsupported Type'], expected: false },
                    { title: 'Supported Type - Should return a result with v1 enabled with the supported type and v2 disabled.', providerName, providerEnabled: true, queryNamespace, queryTypes: ['Supported Type'], expected: true }
                ] as {
                    title: string,
                    providerName: ProviderName,
                    providerEnabled: boolean,
                    queryNamespace: Exclude<DeviceDataNamespace, 'Project'>,
                    queryTypes: string[],
                    expected: boolean
                }[])('$title', ({ providerName, providerEnabled, queryNamespace, queryTypes, expected }) => {
                    const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();
                    combinedDataCollectionSettings.settings[`${providerName}Enabled`] = providerEnabled;
                    if (providerEnabled) {
                        combinedDataCollectionSettings.settings.queryableDeviceDataTypes.push({ namespace: queryNamespace, type: 'Supported Type' });
                    }

                    const result = getSupportedApis(combinedDataCollectionSettings, { namespace: queryNamespace, types: queryTypes, requireAllTypes: false });

                    expect(result).toEqual({
                        v1: { enabled: expected, types: expected ? ['Supported Type'] : undefined },
                        v2: { enabled: false }
                    });
                });
            });
        });

        describe('V2', () => {
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
                    { title: 'Disabled Provider - Should return a result with v1 and v2 disabled.', providerName, providerEnabled: false, queryNamespace, queryTypes: ['Any Type'], expected: false },
                    { title: 'Unsupported Type - Should return a result with v1 and v2 disabled.', providerName, providerEnabled: true, queryNamespace, queryTypes: ['Unsupported Type'], expected: false },
                    { title: 'Supported Type - Should return a result with v1 disable and v2 enabled with the supported type.', providerName, providerEnabled: true, queryNamespace, queryTypes: ['Supported Type'], expected: true }
                ] as {
                    title: string,
                    providerName: ProviderName,
                    providerEnabled: boolean,
                    queryNamespace: DeviceDataV2Namespace,
                    queryTypes: string[],
                    expected: boolean
                }[])('$title', ({ providerName, providerEnabled, queryNamespace, queryTypes, expected }) => {
                    const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();
                    combinedDataCollectionSettings.settings[`${providerName}Enabled`] = providerEnabled;
                    if (providerEnabled) {
                        combinedDataCollectionSettings.deviceDataV2Types.push({ namespace: queryNamespace, type: 'Supported Type', enabled: true });
                    }

                    const result = getSupportedApis(combinedDataCollectionSettings, { namespace: queryNamespace, types: queryTypes, requireAllTypes: false });

                    expect(result).toEqual({
                        v1: { enabled: false },
                        v2: { enabled: expected, types: expected ? ['Supported Type'] : undefined }
                    });
                });
            });
        });

        describe('V1 & V2', () => {
            describe.each([
                { title: 'Apple Health', providerName: 'appleHealth', queryNamespace: 'AppleHealth' },
                { title: 'Fitbit', providerName: 'fitbit', queryNamespace: 'Fitbit' },
                { title: 'Garmin', providerName: 'garmin', queryNamespace: 'Garmin' }
            ] as {
                title: string,
                providerName: ProviderName,
                queryNamespace: DeviceDataNamespace & DeviceDataV2Namespace
            }[])('$title', ({ providerName, queryNamespace }) => {
                test.each([
                    { title: 'Disabled Provider - Should return a result with v1 and v2 disabled.', providerName, providerEnabled: false, queryNamespace, queryTypes: ['Any Type'], expected: false },
                    { title: 'Unsupported Type - Should return a result with v1 and v2 disabled.', providerName, providerEnabled: true, queryNamespace, queryTypes: ['Unsupported Type'], expected: false },
                    { title: 'Supported Type - Should return a result with v1 and v2 enabled with the supported type.', providerName, providerEnabled: true, queryNamespace, queryTypes: ['Supported Type'], expected: true }
                ] as {
                    title: string,
                    providerName: ProviderName,
                    providerEnabled: boolean,
                    queryNamespace: DeviceDataNamespace & DeviceDataV2Namespace,
                    queryTypes: string[],
                    expected: boolean
                }[])('$title', ({ providerName, providerEnabled, queryNamespace, queryTypes, expected }) => {
                    const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();
                    combinedDataCollectionSettings.settings[`${providerName}Enabled`] = providerEnabled;
                    if (providerEnabled) {
                        combinedDataCollectionSettings.settings.queryableDeviceDataTypes.push({ namespace: queryNamespace, type: 'Supported Type' });
                        combinedDataCollectionSettings.deviceDataV2Types.push({ namespace: queryNamespace, type: 'Supported Type', enabled: true });
                    }

                    const result = getSupportedApis(combinedDataCollectionSettings, { namespace: queryNamespace, types: queryTypes, requireAllTypes: false });

                    expect(result).toEqual({
                        v1: { enabled: expected, types: expected ? ['Supported Type'] : undefined },
                        v2: { enabled: expected, types: expected ? ['Supported Type'] : undefined }
                    });
                });
            });
        });

        describe('Strict Mode', () => {
            const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();
            combinedDataCollectionSettings.settings.appleHealthEnabled = true;
            combinedDataCollectionSettings.settings.queryableDeviceDataTypes.push(
                { namespace: 'AppleHealth', type: 'Supported Type V1' },
                { namespace: 'AppleHealth', type: 'Another Supported Type V1' }
            );
            combinedDataCollectionSettings.deviceDataV2Types.push(
                { namespace: 'AppleHealth', type: 'Supported Type V2', enabled: true },
                { namespace: 'AppleHealth', type: 'Another Supported Type V2', enabled: true }
            );

            it('Should allow partial type matches when not in strict mode.', () => {
                const result = getSupportedApis(combinedDataCollectionSettings, {
                    namespace: 'AppleHealth',
                    types: ['Supported Type V1', 'Another Supported Type V1', 'Unsupported Type', 'Supported Type V2', 'Another Supported Type V2'],
                    requireAllTypes: false
                });
                expect(result).toEqual({
                    v1: { enabled: true, types: ['Supported Type V1', 'Another Supported Type V1'] },
                    v2: { enabled: true, types: ['Supported Type V2', 'Another Supported Type V2'] }
                });
            });

            it('Should not allow partial type matches when in strict mode.', () => {
                const result = getSupportedApis(combinedDataCollectionSettings, {
                    namespace: 'AppleHealth',
                    types: ['Supported Type V1', 'Another Supported Type V1', 'Supported Type V2', 'Another Supported Type V2'],
                    requireAllTypes: true
                });
                expect(result).toEqual({
                    v1: { enabled: false },
                    v2: { enabled: false }
                });
            });

            it('Should not allow partial type match when in strict mode, even within a single source.', () => {
                const result = getSupportedApis(combinedDataCollectionSettings, {
                    namespace: 'AppleHealth',
                    types: ['Supported Type V1', 'Another Supported Type V1', 'Unsupported Type'],
                    requireAllTypes: true
                });
                expect(result).toEqual({
                    v1: { enabled: false },
                    v2: { enabled: false }
                });
            });

            it('Should allow full type match when in strict mode, within V1.', () => {
                const result = getSupportedApis(combinedDataCollectionSettings, {
                    namespace: 'AppleHealth',
                    types: ['Supported Type V1', 'Another Supported Type V1'],
                    requireAllTypes: true
                });
                expect(result).toEqual({
                    v1: { enabled: true, types: ['Supported Type V1', 'Another Supported Type V1'] },
                    v2: { enabled: false }
                });
            });

            it('Should allow full type match when in strict mode, within V2.', () => {
                const result = getSupportedApis(combinedDataCollectionSettings, {
                    namespace: 'AppleHealth',
                    types: ['Supported Type V2', 'Another Supported Type V2'],
                    requireAllTypes: true
                });
                expect(result).toEqual({
                    v1: { enabled: false },
                    v2: { enabled: true, types: ['Supported Type V2', 'Another Supported Type V2'] }
                });
            });
        });
    });

    describe('hasV1Data', () => {
        const namespace: DeviceDataNamespace = 'AppleHealth';
        const type1 = 'Type 1';
        const type2 = 'Type 2';

        const queryDeviceDataMock = MyDataHelps.queryDeviceData as jest.Mock;

        it('Should reject with false when the query fails.', async () => {
            queryDeviceDataMock.mockRejectedValue(new Error('Query failed'));

            try {
                await hasV1Data(namespace, [type1, type2]);
                fail('Expected a rejection.');
            } catch (rejection) {
                expect(rejection).toBe(false);
            }
        });

        it('Should reject with false when no data points exist.', async () => {
            queryDeviceDataMock.mockResolvedValue({ deviceDataPoints: [] } as DeviceDataPointsPage);

            try {
                await hasV1Data(namespace, [type1, type2]);
                fail('Expected a rejection.');
            } catch (rejection) {
                expect(rejection).toBe(false);
            }

            expect(queryDeviceDataMock).toHaveBeenCalledTimes(1);
            expect(queryDeviceDataMock).toHaveBeenCalledWith({ namespace: namespace, type: [type1, type2], limit: 1 });
        });

        it('Should return true when data points exist.', async () => {
            queryDeviceDataMock.mockResolvedValue({ deviceDataPoints: [{}] } as DeviceDataPointsPage);

            const result = await hasV1Data(namespace, [type1, type2]);

            expect(result).toBe(true);

            expect(queryDeviceDataMock).toHaveBeenCalledTimes(1);
            expect(queryDeviceDataMock).toHaveBeenCalledWith({ namespace: namespace, type: [type1, type2], limit: 1 });
        });

        it('Should include the modifiedAfter parameter.', async () => {
            queryDeviceDataMock.mockResolvedValue({ deviceDataPoints: [{}] } as DeviceDataPointsPage);

            const modifiedAfter = new Date();

            const result = await hasV1Data(namespace, [type1, type2], modifiedAfter);

            expect(result).toBe(true);

            expect(queryDeviceDataMock).toHaveBeenCalledTimes(1);
            expect(queryDeviceDataMock).toHaveBeenCalledWith({ namespace: namespace, type: [type1, type2], limit: 1, modifiedAfter: modifiedAfter.toISOString() });
        });
    });

    describe('hasV2Data', () => {
        const namespace: DeviceDataV2Namespace = 'AppleHealth';
        const type1 = 'Test Type';
        const type2 = 'Other Test Type';

        const queryDeviceDataV2Mock = MyDataHelps.queryDeviceDataV2 as jest.Mock;

        it('Should reject with false when all queries fail.', async () => {
            const error = new Error('Query failed');
            queryDeviceDataV2Mock.mockRejectedValue(error);

            try {
                await hasV2Data(namespace, [type1, type2]);
                fail('Expected a rejection.');
            } catch (rejection) {
                expect(rejection).toBe(false);
            }

            expect(queryDeviceDataV2Mock).toHaveBeenCalledTimes(2);
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(1, { namespace: namespace, type: type1, limit: 1 });
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(2, { namespace: namespace, type: type2, limit: 1 });
        });

        it('Should reject with false when no data points exist.', async () => {
            queryDeviceDataV2Mock.mockResolvedValue({ deviceDataPoints: [] } as DeviceDataV2Page);

            try {
                await hasV2Data(namespace, [type1, type2]);
                fail('Expected a rejection.');
            } catch (rejection) {
                expect(rejection).toBe(false);
            }

            expect(queryDeviceDataV2Mock).toHaveBeenCalledTimes(2);
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(1, { namespace: namespace, type: type1, limit: 1 });
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(2, { namespace: namespace, type: type2, limit: 1 });
        });

        it('Should return true when data points exist for the first type.', async () => {
            queryDeviceDataV2Mock
                .mockResolvedValueOnce({ deviceDataPoints: [{}] } as DeviceDataV2Page)
                .mockResolvedValueOnce({ deviceDataPoints: [] } as DeviceDataV2Page);

            const result = await hasV2Data(namespace, [type1, type2]);

            expect(result).toBe(true);

            expect(queryDeviceDataV2Mock).toHaveBeenCalledTimes(2);
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(1, { namespace: namespace, type: type1, limit: 1 });
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(2, { namespace: namespace, type: type2, limit: 1 });
        });

        it('Should return true when data points exist for the first type and the second query fails.', async () => {
            const error = new Error('Query failed');
            queryDeviceDataV2Mock
                .mockResolvedValueOnce({ deviceDataPoints: [{}] } as DeviceDataV2Page)
                .mockRejectedValueOnce(error);

            const result = await hasV2Data(namespace, [type1, type2]);

            expect(result).toBe(true);

            expect(queryDeviceDataV2Mock).toHaveBeenCalledTimes(2);
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(1, { namespace: namespace, type: type1, limit: 1 });
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(2, { namespace: namespace, type: type2, limit: 1 });
        });

        it('Should return true when data points exist for the second type.', async () => {
            queryDeviceDataV2Mock
                .mockResolvedValueOnce({ deviceDataPoints: [] } as DeviceDataV2Page)
                .mockResolvedValueOnce({ deviceDataPoints: [{}] } as DeviceDataV2Page);

            const result = await hasV2Data(namespace, [type1, type2]);

            expect(result).toBe(true);

            expect(queryDeviceDataV2Mock).toHaveBeenCalledTimes(2);
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(1, { namespace: namespace, type: type1, limit: 1 });
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(2, { namespace: namespace, type: type2, limit: 1 });
        });

        it('Should return true when data points exist for the second type and the first query fails.', async () => {
            const error = new Error('Query failed');
            queryDeviceDataV2Mock
                .mockRejectedValueOnce(error)
                .mockResolvedValueOnce({ deviceDataPoints: [{}] } as DeviceDataV2Page);

            const result = await hasV2Data(namespace, [type1, type2]);

            expect(result).toBe(true);

            expect(queryDeviceDataV2Mock).toHaveBeenCalledTimes(2);
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(1, { namespace: namespace, type: type1, limit: 1 });
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(2, { namespace: namespace, type: type2, limit: 1 });
        });

        it('Should include the modifiedAfter parameter.', async () => {
            queryDeviceDataV2Mock.mockResolvedValue({ deviceDataPoints: [{}] } as DeviceDataV2Page);

            const modifiedAfter = new Date();

            const result = await hasV2Data(namespace, [type1, type2], modifiedAfter);

            expect(result).toBe(true);

            expect(queryDeviceDataV2Mock).toHaveBeenCalledTimes(2);
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(1, { namespace: namespace, type: type1, limit: 1, modifiedAfter: modifiedAfter.toISOString() });
            expect(queryDeviceDataV2Mock).toHaveBeenNthCalledWith(2, { namespace: namespace, type: type2, limit: 1, modifiedAfter: modifiedAfter.toISOString() });
        });
    });
});
