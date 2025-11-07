import { combinedAvailabilityCheck, DataSource, simpleAvailabilityCheck } from '../../../src/helpers/daily-data-types/availability-check';
import { DeviceDataNamespace, DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';
import { getSupportedApis, hasV1Data, hasV2Data } from '../../../src/helpers/daily-data-providers/data-collection-helper';
import { createEmptyCombinedDataCollectionSettings } from '../../fixtures/daily-data-providers';

jest.mock('../../../src/helpers/daily-data-providers/data-collection-helper', () => ({
    __esModule: true,
    getSupportedApis: jest.fn(),
    hasV1Data: jest.fn(),
    hasV2Data: jest.fn()
}));

describe('Availability Check Tests', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    const getSupportedApisMock = getSupportedApis as jest.Mock;
    const hasV1DataMock = hasV1Data as jest.Mock;
    const hasV2DataMock = hasV2Data as jest.Mock;

    const combinedDataCollectionSettings = createEmptyCombinedDataCollectionSettings();

    describe('simpleAvailabilityCheck', () => {
        const namespace: DeviceDataNamespace | DeviceDataV2Namespace = 'Fitbit';
        const type1 = 'Type 1';
        const type2 = 'Type 2';

        it('Should return false when querying is not enabled for the specified types.', async () => {
            getSupportedApisMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: false } });

            const result = await simpleAvailabilityCheck(namespace, [type1, type2])(combinedDataCollectionSettings);

            expect(result).toBe(false);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
            expect(getSupportedApisMock).toHaveBeenCalledWith(combinedDataCollectionSettings, { namespace: namespace, types: [type1, type2], requireAllTypes: false });
            expect(hasV1DataMock).not.toHaveBeenCalled();
            expect(hasV2DataMock).not.toHaveBeenCalled();
        });

        it('Should return false when querying is enabled for the specified types but no data points exist.', async () => {
            getSupportedApisMock.mockReturnValue({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } });
            hasV1DataMock.mockRejectedValue(false);
            hasV2DataMock.mockRejectedValue(false);

            const result = await simpleAvailabilityCheck(namespace, [type1, type2])(combinedDataCollectionSettings);

            expect(result).toBe(false);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
            expect(getSupportedApisMock).toHaveBeenCalledWith(combinedDataCollectionSettings, { namespace: namespace, types: [type1, type2], requireAllTypes: false });
            expect(hasV1DataMock).toHaveBeenCalledTimes(1);
            expect(hasV1DataMock).toHaveBeenCalledWith(namespace, [type1], undefined);
            expect(hasV2DataMock).toHaveBeenCalledTimes(1);
            expect(hasV2DataMock).toHaveBeenCalledWith(namespace, [type2], undefined);
        });

        it('Should return true when querying is enabled for the specified types and data points exist in V1.', async () => {
            getSupportedApisMock.mockReturnValue({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } });
            hasV1DataMock.mockResolvedValue(true);
            hasV2DataMock.mockRejectedValue(false);

            const result = await simpleAvailabilityCheck(namespace, [type1, type2])(combinedDataCollectionSettings);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
            expect(getSupportedApisMock).toHaveBeenCalledWith(combinedDataCollectionSettings, { namespace: namespace, types: [type1, type2], requireAllTypes: false });
            expect(hasV1DataMock).toHaveBeenCalledTimes(1);
            expect(hasV1DataMock).toHaveBeenCalledWith(namespace, [type1], undefined);
            expect(hasV2DataMock).toHaveBeenCalledTimes(1);
            expect(hasV2DataMock).toHaveBeenCalledWith(namespace, [type2], undefined);
        });

        it('Should return true when querying is enabled for the specified types and data points exist in V2.', async () => {
            getSupportedApisMock.mockReturnValue({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } });
            hasV1DataMock.mockRejectedValue(false);
            hasV2DataMock.mockResolvedValue(true);

            const result = await simpleAvailabilityCheck(namespace, [type1, type2])(combinedDataCollectionSettings);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
            expect(getSupportedApisMock).toHaveBeenCalledWith(combinedDataCollectionSettings, { namespace: namespace, types: [type1, type2], requireAllTypes: false });
            expect(hasV1DataMock).toHaveBeenCalledTimes(1);
            expect(hasV1DataMock).toHaveBeenCalledWith(namespace, [type1], undefined);
            expect(hasV2DataMock).toHaveBeenCalledTimes(1);
            expect(hasV2DataMock).toHaveBeenCalledWith(namespace, [type2], undefined);
        });

        it('Should use the modifiedAfter date when provided.', async () => {
            getSupportedApisMock.mockReturnValue({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } });
            hasV1DataMock.mockResolvedValue(true);
            hasV2DataMock.mockRejectedValue(false);

            const modifiedAfter = new Date();

            const result = await simpleAvailabilityCheck(namespace, [type1, type2])(combinedDataCollectionSettings, modifiedAfter);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
            expect(getSupportedApisMock).toHaveBeenCalledWith(combinedDataCollectionSettings, { namespace: namespace, types: [type1, type2], requireAllTypes: false });
            expect(hasV1DataMock).toHaveBeenCalledTimes(1);
            expect(hasV1DataMock).toHaveBeenCalledWith(namespace, [type1], modifiedAfter);
            expect(hasV2DataMock).toHaveBeenCalledTimes(1);
            expect(hasV2DataMock).toHaveBeenCalledWith(namespace, [type2], modifiedAfter);
        });

        it('Should use the requireAllTypes flag when provided - V1.', async () => {
            getSupportedApisMock.mockReturnValue({ v1: { enabled: true, types: [type1, type2] }, v2: { enabled: false } });
            hasV1DataMock.mockResolvedValue(true);

            const result = await simpleAvailabilityCheck(namespace, [type1, type2], { requireAllTypes: true })(combinedDataCollectionSettings);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
            expect(getSupportedApisMock).toHaveBeenCalledWith(combinedDataCollectionSettings, { namespace: namespace, types: [type1, type2], requireAllTypes: true });
            expect(hasV1DataMock).toHaveBeenCalledTimes(1);
            expect(hasV1DataMock).toHaveBeenCalledWith(namespace, [type1, type2], undefined);
            expect(hasV2DataMock).not.toHaveBeenCalled();
        });

        it('Should use the requireAllTypes flag when provided - V2.', async () => {
            getSupportedApisMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: true, types: [type1, type2] } });
            hasV2DataMock.mockResolvedValue(true);

            const result = await simpleAvailabilityCheck(namespace, [type1, type2], { requireAllTypes: true })(combinedDataCollectionSettings);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
            expect(getSupportedApisMock).toHaveBeenCalledWith(combinedDataCollectionSettings, { namespace: namespace, types: [type1, type2], requireAllTypes: true });
            expect(hasV1DataMock).not.toHaveBeenCalled();
            expect(hasV2DataMock).toHaveBeenCalledTimes(1);
            expect(hasV2DataMock).toHaveBeenCalledWith(namespace, [type1, type2], undefined);
        });
    });

    describe('combinedAvailabilityCheck', () => {
        const namespace1: DeviceDataNamespace | DeviceDataV2Namespace = 'Fitbit';
        const namespace2: DeviceDataNamespace | DeviceDataV2Namespace = 'Garmin';
        const type1 = 'Type 1';
        const type2 = 'Type 2';
        const type3 = 'Type 3';
        const type4 = 'Type 4';

        it('Should return false when querying is not enabled for the specified types.', async () => {
            getSupportedApisMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: false } });

            const sources: DataSource[] = [
                { namespace: namespace1, type: [type1, type2] },
                { namespace: namespace2, type: [type3, type4] }
            ];

            const result = await combinedAvailabilityCheck(sources)(combinedDataCollectionSettings);

            expect(result).toBe(false);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(2);
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(1, combinedDataCollectionSettings, { namespace: namespace1, types: [type1, type2], requireAllTypes: false });
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(2, combinedDataCollectionSettings, { namespace: namespace2, types: [type3, type4], requireAllTypes: false });
            expect(hasV1DataMock).not.toHaveBeenCalled();
            expect(hasV2DataMock).not.toHaveBeenCalled();
        });

        it('Should return false when querying is enabled for the specified types but no data points exist.', async () => {
            getSupportedApisMock
                .mockReturnValueOnce({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } })
                .mockReturnValueOnce({ v1: { enabled: true, types: [type3] }, v2: { enabled: true, types: [type4] } });
            hasV1DataMock.mockRejectedValue(false);
            hasV2DataMock.mockRejectedValue(false);

            const sources: DataSource[] = [
                { namespace: namespace1, type: [type1, type2] },
                { namespace: namespace2, type: [type3, type4] }
            ];

            const result = await combinedAvailabilityCheck(sources)(combinedDataCollectionSettings);

            expect(result).toBe(false);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(2);
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(1, combinedDataCollectionSettings, { namespace: namespace1, types: [type1, type2], requireAllTypes: false });
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(2, combinedDataCollectionSettings, { namespace: namespace2, types: [type3, type4], requireAllTypes: false });
            expect(hasV1DataMock).toHaveBeenCalledTimes(2);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(1, namespace1, [type1], undefined);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(2, namespace2, [type3], undefined);
            expect(hasV2DataMock).toHaveBeenCalledTimes(2);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(1, namespace1, [type2], undefined);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(2, namespace2, [type4], undefined);
        });

        it('Should return true when querying is enabled for the specified types and data points exist in V1.', async () => {
            getSupportedApisMock
                .mockReturnValueOnce({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } })
                .mockReturnValueOnce({ v1: { enabled: true, types: [type3] }, v2: { enabled: true, types: [type4] } });
            hasV1DataMock
                .mockRejectedValueOnce(false)
                .mockResolvedValueOnce(true);
            hasV2DataMock.mockRejectedValue(false);

            const sources: DataSource[] = [
                { namespace: namespace1, type: [type1, type2] },
                { namespace: namespace2, type: [type3, type4] }
            ];

            const result = await combinedAvailabilityCheck(sources)(combinedDataCollectionSettings);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(2);
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(1, combinedDataCollectionSettings, { namespace: namespace1, types: [type1, type2], requireAllTypes: false });
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(2, combinedDataCollectionSettings, { namespace: namespace2, types: [type3, type4], requireAllTypes: false });
            expect(hasV1DataMock).toHaveBeenCalledTimes(2);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(1, namespace1, [type1], undefined);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(2, namespace2, [type3], undefined);
            expect(hasV2DataMock).toHaveBeenCalledTimes(2);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(1, namespace1, [type2], undefined);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(2, namespace2, [type4], undefined);
        });

        it('Should return true when querying is enabled for the specified types and data points exist in V2.', async () => {
            getSupportedApisMock
                .mockReturnValueOnce({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } })
                .mockReturnValueOnce({ v1: { enabled: true, types: [type3] }, v2: { enabled: true, types: [type4] } });
            hasV1DataMock.mockRejectedValue(false);
            hasV2DataMock
                .mockRejectedValueOnce(false)
                .mockResolvedValueOnce(true);

            const sources: DataSource[] = [
                { namespace: namespace1, type: [type1, type2] },
                { namespace: namespace2, type: [type3, type4] }
            ];

            const result = await combinedAvailabilityCheck(sources)(combinedDataCollectionSettings);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(2);
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(1, combinedDataCollectionSettings, { namespace: namespace1, types: [type1, type2], requireAllTypes: false });
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(2, combinedDataCollectionSettings, { namespace: namespace2, types: [type3, type4], requireAllTypes: false });
            expect(hasV1DataMock).toHaveBeenCalledTimes(2);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(1, namespace1, [type1], undefined);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(2, namespace2, [type3], undefined);
            expect(hasV2DataMock).toHaveBeenCalledTimes(2);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(1, namespace1, [type2], undefined);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(2, namespace2, [type4], undefined);
        });

        it('Should use the modifiedAfter date when provided.', async () => {
            getSupportedApisMock
                .mockReturnValueOnce({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } })
                .mockReturnValueOnce({ v1: { enabled: true, types: [type3] }, v2: { enabled: true, types: [type4] } });
            hasV1DataMock.mockResolvedValue(true);
            hasV2DataMock.mockRejectedValue(false);

            const sources: DataSource[] = [
                { namespace: namespace1, type: [type1, type2] },
                { namespace: namespace2, type: [type3, type4] }
            ];
            const modifiedAfter = new Date();

            const result = await combinedAvailabilityCheck(sources)(combinedDataCollectionSettings, modifiedAfter);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(2);
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(1, combinedDataCollectionSettings, { namespace: namespace1, types: [type1, type2], requireAllTypes: false });
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(2, combinedDataCollectionSettings, { namespace: namespace2, types: [type3, type4], requireAllTypes: false });
            expect(hasV1DataMock).toHaveBeenCalledTimes(2);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(1, namespace1, [type1], modifiedAfter);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(2, namespace2, [type3], modifiedAfter);
            expect(hasV2DataMock).toHaveBeenCalledTimes(2);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(1, namespace1, [type2], modifiedAfter);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(2, namespace2, [type4], modifiedAfter);
        });

        it('Should use the requireAllTypes flag when provided - V1.', async () => {
            getSupportedApisMock
                .mockReturnValueOnce({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } })
                .mockReturnValueOnce({ v1: { enabled: true, types: [type3, type4] }, v2: { enabled: false } });
            hasV1DataMock
                .mockRejectedValueOnce(false)
                .mockReturnValueOnce(true);
            hasV2DataMock.mockRejectedValue(false);

            const sources: DataSource[] = [
                { namespace: namespace1, type: [type1, type2], options: { requireAllTypes: false } },
                { namespace: namespace2, type: [type3, type4], options: { requireAllTypes: true } }
            ];

            const result = await combinedAvailabilityCheck(sources)(combinedDataCollectionSettings);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(2);
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(1, combinedDataCollectionSettings, { namespace: namespace1, types: [type1, type2], requireAllTypes: false });
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(2, combinedDataCollectionSettings, { namespace: namespace2, types: [type3, type4], requireAllTypes: true });
            expect(hasV1DataMock).toHaveBeenCalledTimes(2);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(1, namespace1, [type1], undefined);
            expect(hasV1DataMock).toHaveBeenNthCalledWith(2, namespace2, [type3, type4], undefined);
            expect(hasV2DataMock).toHaveBeenCalledTimes(1);
            expect(hasV2DataMock).toHaveBeenCalledWith(namespace1, [type2], undefined);
        });

        it('Should use the requireAllTypes flag when provided - V2.', async () => {
            getSupportedApisMock
                .mockReturnValueOnce({ v1: { enabled: true, types: [type1] }, v2: { enabled: true, types: [type2] } })
                .mockReturnValueOnce({ v1: { enabled: false }, v2: { enabled: true, types: [type3, type4] } });
            hasV1DataMock.mockRejectedValue(false);
            hasV2DataMock
                .mockRejectedValueOnce(false)
                .mockResolvedValueOnce(true);

            const sources: DataSource[] = [
                { namespace: namespace1, type: [type1, type2], options: { requireAllTypes: false } },
                { namespace: namespace2, type: [type3, type4], options: { requireAllTypes: true } }
            ];

            const result = await combinedAvailabilityCheck(sources)(combinedDataCollectionSettings);

            expect(result).toBe(true);

            expect(getSupportedApisMock).toHaveBeenCalledTimes(2);
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(1, combinedDataCollectionSettings, { namespace: namespace1, types: [type1, type2], requireAllTypes: false });
            expect(getSupportedApisMock).toHaveBeenNthCalledWith(2, combinedDataCollectionSettings, { namespace: namespace2, types: [type3, type4], requireAllTypes: true });
            expect(hasV1DataMock).toHaveBeenCalledTimes(1);
            expect(hasV1DataMock).toHaveBeenCalledWith(namespace1, [type1], undefined);
            expect(hasV2DataMock).toHaveBeenCalledTimes(2);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(1, namespace1, [type2], undefined);
            expect(hasV2DataMock).toHaveBeenNthCalledWith(2, namespace2, [type3, type4], undefined);
        });
    });
});
