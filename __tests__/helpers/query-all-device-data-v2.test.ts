import { describe, expect, it } from '@jest/globals';
import MyDataHelps, { DeviceDataV2Page, DeviceDataV2Point, DeviceDataV2Query } from '@careevolution/mydatahelps-js';
import queryAllDeviceDataV2 from '../../src/helpers/query-all-device-data-v2';

jest.mock('@careevolution/mydatahelps-js', () => {
    return {
        __esModule: true,
        default: {
            queryDeviceDataV2: jest.fn()
        }
    }
});

describe('Query All Device Data V2', () => {
    const queryDeviceDataV2 = (MyDataHelps.queryDeviceDataV2 as jest.Mock);

    const query: DeviceDataV2Query = {
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
        limit: 10
    };
    const dataPoint1 = { identifier: '1' } as DeviceDataV2Point;
    const dataPoint2 = { identifier: '2' } as DeviceDataV2Point;
    const dataPoint3 = { identifier: '3' } as DeviceDataV2Point;

    const setupQueryDeviceDataV2 = (withFailure: boolean = false): void => {
        queryDeviceDataV2.mockImplementation((queryParameters: DeviceDataV2Query): Promise<DeviceDataV2Page> => {
            if (JSON.stringify(queryParameters) === JSON.stringify({ ...query, pageID: queryParameters.pageID })) {
                if (!queryParameters.pageID) {
                    return Promise.resolve({ deviceDataPoints: [dataPoint1], nextPageID: '2' });
                } else if (queryParameters.pageID === '2') {
                    return !withFailure ? Promise.resolve({ deviceDataPoints: [dataPoint2], nextPageID: '3' }) : Promise.reject();
                } else if (queryParameters.pageID === '3') {
                    return Promise.resolve({ deviceDataPoints: [dataPoint3] });
                }
            }
            return Promise.reject();
        });
    };

    it('Should query for data points until all paged results can be returned at once.', async () => {
        setupQueryDeviceDataV2();
        expect(await queryAllDeviceDataV2(query)).toEqual([dataPoint1, dataPoint2, dataPoint3]);
    });

    it('Should return all data points queried so far when an error occurs.', async () => {
        setupQueryDeviceDataV2(true);
        expect(await queryAllDeviceDataV2(query)).toEqual([dataPoint1]);
    });
});
