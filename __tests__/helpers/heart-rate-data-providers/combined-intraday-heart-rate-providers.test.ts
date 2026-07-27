import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery, DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';
import combinedIntradayHeartRateDataProvider, { withGoogleHealthPreferred } from '../../../src/helpers/heart-rate-data-providers/combined-intraday-heart-rate-providers';
import queryAllDeviceDataV2Aggregates from '../../../src/helpers/query-all-device-data-v2-aggregates';

jest.mock('../../../src/helpers/query-all-device-data-v2-aggregates', () => ({
    __esModule: true,
    default: jest.fn()
}));

const queryMock = queryAllDeviceDataV2Aggregates as jest.Mock;

describe('withGoogleHealthPreferred', () => {
    it('inserts Google Health right before Fitbit when Fitbit is a source', () => {
        expect(withGoogleHealthPreferred(['Fitbit'])).toEqual(['GoogleHealth', 'Fitbit']);
        expect(withGoogleHealthPreferred(['AppleHealth', 'Fitbit'])).toEqual(['AppleHealth', 'GoogleHealth', 'Fitbit']);
    });

    it('does nothing when Fitbit is not a source', () => {
        expect(withGoogleHealthPreferred(['Garmin', 'AppleHealth'])).toEqual(['Garmin', 'AppleHealth']);
    });

    it('does not duplicate Google Health when it is already listed', () => {
        expect(withGoogleHealthPreferred(['Fitbit', 'GoogleHealth'])).toEqual(['Fitbit', 'GoogleHealth']);
        expect(withGoogleHealthPreferred(['GoogleHealth', 'Fitbit'])).toEqual(['GoogleHealth', 'Fitbit']);
    });
});

describe('combinedIntradayHeartRateDataProvider', () => {
    const t1 = '2024-01-01T08:00:00.000Z';
    const t2 = '2024-01-01T08:01:00.000Z';

    const aggregate = (namespace: DeviceDataV2Namespace, type: string, date: string, value: number): DeviceDataV2Aggregate => ({
        participantID: 'p', participantIdentifier: 'p', namespace, type, date, statistics: { max: value }
    });

    beforeEach(() => jest.resetAllMocks());

    it('prefers Google Health over Fitbit, with Google Health winning each interval and Fitbit filling gaps', async () => {
        queryMock.mockImplementation(async (params: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> => {
            if (params.namespace === 'Fitbit') {
                expect(params.type).toBe('activities-heart-intraday');
                return [aggregate('Fitbit', params.type, t1, 70), aggregate('Fitbit', params.type, t2, 60)];
            }
            if (params.namespace === 'GoogleHealth') {
                expect(params.type).toBe('heartRate-list');
                return [aggregate('GoogleHealth', params.type, t1, 999)];
            }
            return [];
        });

        const result = await combinedIntradayHeartRateDataProvider(['Fitbit'], new Date(t1), new Date('2024-01-01T09:00:00.000Z'), 'max', 1);

        const namespacesQueried = queryMock.mock.calls.map(call => (call[0] as DeviceDataV2AggregateQuery).namespace);
        expect(namespacesQueried).toEqual(['GoogleHealth', 'Fitbit']);
        // Google Health wins t1 (999, not the Fitbit 70); Fitbit fills the t2 gap Google Health is missing.
        expect(result).toEqual({ [new Date(t1).getTime()]: 999, [new Date(t2).getTime()]: 60 });
    });
});
