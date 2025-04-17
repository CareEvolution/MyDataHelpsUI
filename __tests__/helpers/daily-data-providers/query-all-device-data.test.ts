import { describe, expect, it } from '@jest/globals';
import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataPointsPage } from '@careevolution/mydatahelps-js';
import queryAllDeviceData from '../../../src/helpers/daily-data-providers/query-all-device-data';

jest.mock('@careevolution/mydatahelps-js', () => {
    return {
        __esModule: true,
        default: {
            queryDeviceData: jest.fn()
        }
    }
});

describe('Query All Device Data', () => {
    const queryDeviceData = (MyDataHelps.queryDeviceData as jest.Mock);

    const query: DeviceDataPointQuery = {
        namespace: 'Project',
        type: 'SomeType',
        observedAfter: new Date().toISOString(),
        observedBefore: new Date().toISOString(),
        modifiedAfter: new Date().toISOString(),
        modifiedBefore: new Date().toISOString(),
        limit: 10
    };
    const dataPoint1 = { identifier: '1' } as DeviceDataPoint;
    const dataPoint2 = { identifier: '2' } as DeviceDataPoint;
    const dataPoint3 = { identifier: '3' } as DeviceDataPoint;

    const setupQueryDeviceData = (withFailure: boolean = false): void => {
        queryDeviceData.mockImplementation((queryParameters: DeviceDataPointQuery): Promise<DeviceDataPointsPage> => {
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
        setupQueryDeviceData();
        expect(await queryAllDeviceData(query)).toEqual([dataPoint1, dataPoint2, dataPoint3]);
    });

    it('Should return all data points queried so far when an error occurs.', async () => {
        setupQueryDeviceData(true);
        expect(await queryAllDeviceData(query)).toEqual([dataPoint1]);
    });
});
