import { describe, expect, it } from '@jest/globals';
import MyDataHelps, { DeviceDataV2Aggregate, DeviceDataV2AggregatePage, DeviceDataV2AggregateQuery } from '@careevolution/mydatahelps-js';
import queryAllDeviceDataV2Aggregates from '../../src/helpers/query-all-device-data-v2-aggregates';

jest.mock('@careevolution/mydatahelps-js', () => {
    return {
        __esModule: true,
        default: {
            queryDeviceDataV2Aggregate: jest.fn()
        }
    }
});

describe('Query All Device Data V2 Aggregates', () => {
    const queryDeviceDataV2Aggregate = (MyDataHelps.queryDeviceDataV2Aggregate as jest.Mock);

    const query: DeviceDataV2AggregateQuery = {
        namespace: 'Fitbit',
        type: 'SomeType',
        observedAfter: new Date().toISOString(),
        observedBefore: new Date().toISOString(),
        modifiedAfter: new Date().toISOString(),
        modifiedBefore: new Date().toISOString(),
        insertedAfter: new Date().toISOString(),
        insertedBefore: new Date().toISOString(),
        dataSource: { 'key1': 'value1' },
        properties: { 'key2': 'value2' },
        intervalType: 'Hours',
        intervalAmount: 12,
        aggregateFunctions: ['avg', 'sum'],
        limit: 10
    };
    const aggregate1 = { statistics: { 'key': 1 } as { [key: string]: number } } as DeviceDataV2Aggregate;
    const aggregate2 = { statistics: { 'key': 2 } as { [key: string]: number } } as DeviceDataV2Aggregate;
    const aggregate3 = { statistics: { 'key': 3 } as { [key: string]: number } } as DeviceDataV2Aggregate;

    const setupQueryDeviceDataV2Aggregate = (withFailure: boolean = false): void => {
        queryDeviceDataV2Aggregate.mockImplementation((queryParameters: DeviceDataV2AggregateQuery): Promise<DeviceDataV2AggregatePage> => {
            if (JSON.stringify(queryParameters) === JSON.stringify({ ...query, pageID: queryParameters.pageID })) {
                if (!queryParameters.pageID) {
                    return Promise.resolve({ intervals: [aggregate1], nextPageID: '2' });
                } else if (queryParameters.pageID === '2') {
                    return !withFailure ? Promise.resolve({ intervals: [aggregate2], nextPageID: '3' }) : Promise.reject();
                } else if (queryParameters.pageID === '3') {
                    return Promise.resolve({ intervals: [aggregate3] });
                }
            }
            return Promise.reject();
        });
    };

    it('Should query for aggregates until all paged results can be returned at once.', async () => {
        setupQueryDeviceDataV2Aggregate();
        expect(await queryAllDeviceDataV2Aggregates(query)).toEqual([aggregate1, aggregate2, aggregate3]);
    });

    it('Should return all aggregates queried so far when an error occurs.', async () => {
        setupQueryDeviceDataV2Aggregate(true);
        expect(await queryAllDeviceDataV2Aggregates(query)).toEqual([aggregate1]);
    });
});
