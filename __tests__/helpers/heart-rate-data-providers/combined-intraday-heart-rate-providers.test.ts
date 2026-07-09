import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery, DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';
import combinedIntradayHeartRateDataProvider, { withGoogleHealthFallback } from '../../../src/helpers/heart-rate-data-providers/combined-intraday-heart-rate-providers';
import queryAllDeviceDataV2Aggregates from '../../../src/helpers/query-all-device-data-v2-aggregates';

jest.mock('../../../src/helpers/query-all-device-data-v2-aggregates', () => ({
    __esModule: true,
    default: jest.fn()
}));

const queryMock = queryAllDeviceDataV2Aggregates as jest.Mock;

describe('withGoogleHealthFallback', () => {
    it('inserts Google Health right after Fitbit when Fitbit is a source', () => {
        expect(withGoogleHealthFallback(['Fitbit'])).toEqual(['Fitbit', 'GoogleHealth']);
        expect(withGoogleHealthFallback(['AppleHealth', 'Fitbit'])).toEqual(['AppleHealth', 'Fitbit', 'GoogleHealth']);
    });

    it('does nothing when Fitbit is not a source', () => {
        expect(withGoogleHealthFallback(['Garmin', 'AppleHealth'])).toEqual(['Garmin', 'AppleHealth']);
    });

    it('does not duplicate Google Health when it is already listed', () => {
        expect(withGoogleHealthFallback(['Fitbit', 'GoogleHealth'])).toEqual(['Fitbit', 'GoogleHealth']);
        expect(withGoogleHealthFallback(['GoogleHealth', 'Fitbit'])).toEqual(['GoogleHealth', 'Fitbit']);
    });
});

describe('combinedIntradayHeartRateDataProvider', () => {
    const t1 = '2024-01-01T08:00:00.000Z';
    const t2 = '2024-01-01T08:01:00.000Z';

    const aggregate = (namespace: DeviceDataV2Namespace, type: string, date: string, value: number): DeviceDataV2Aggregate => ({
        participantID: 'p', participantIdentifier: 'p', namespace, type, date, statistics: { max: value }
    });

    beforeEach(() => jest.resetAllMocks());

    it('queries Google Health heart-rate as a fallback for Fitbit, with Fitbit winning each interval', async () => {
        queryMock.mockImplementation(async (params: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> => {
            if (params.namespace === 'Fitbit') {
                expect(params.type).toBe('activities-heart-intraday');
                return [aggregate('Fitbit', params.type, t1, 70)];
            }
            if (params.namespace === 'GoogleHealth') {
                expect(params.type).toBe('heartRate-list');
                return [aggregate('GoogleHealth', params.type, t1, 999), aggregate('GoogleHealth', params.type, t2, 60)];
            }
            return [];
        });

        const result = await combinedIntradayHeartRateDataProvider(['Fitbit'], new Date(t1), new Date('2024-01-01T09:00:00.000Z'), 'max', 1);

        const namespacesQueried = queryMock.mock.calls.map(call => (call[0] as DeviceDataV2AggregateQuery).namespace);
        expect(namespacesQueried).toEqual(['Fitbit', 'GoogleHealth']);
        // Fitbit wins t1 (70, not the Google Health 999); Google Health fills the t2 gap.
        expect(result).toEqual({ [new Date(t1).getTime()]: 70, [new Date(t2).getTime()]: 60 });
    });
});
