import { describe, expect, it } from '@jest/globals';
import { DeviceDataPoint, DeviceDataPointQuery } from '@careevolution/mydatahelps-js';
import * as deviceDataQueryFunctions from '../../../../../src/helpers/daily-data-providers/query-all-device-data';
import { add } from 'date-fns';
import { sampleEndDate, sampleStartDate } from '../../../../fixtures/daily-data-providers';
import { queryAsthmaDeviceData } from '../../../../../src/components/asthma/helpers/daily-data-providers';

describe('Asthma - Daily Data Providers - Shared', () => {
    describe('queryAsthmaDeviceData', () => {
        it('Should query for data and return a result with the latest value from each day.', async () => {
            const dataPoints: DeviceDataPoint[] = [
                { observationDate: '2025-05-02T09:25:23-06:00', value: '100' } as DeviceDataPoint,
                { observationDate: '2025-05-02T09:30:23-06:00', value: '101' } as DeviceDataPoint,
                { observationDate: '2025-05-03T09:40:23-06:00', value: '200' } as DeviceDataPoint,
                { observationDate: '2025-05-03T09:35:23-06:00', value: '201' } as DeviceDataPoint,
                { observationDate: '2025-05-04T09:45:23-06:00', value: '300' } as DeviceDataPoint,
                { observationDate: '2025-05-04T09:50:23-06:00', value: '301' } as DeviceDataPoint
            ];
            jest.spyOn(deviceDataQueryFunctions, 'default').mockImplementation(
                (actualParameters: DeviceDataPointQuery): Promise<DeviceDataPoint[]> => {
                    if (actualParameters.namespace !== 'Project') return Promise.reject();
                    if (actualParameters.type !== 'Steps') return Promise.reject();
                    if (actualParameters.observedAfter !== add(sampleStartDate, { days: -1 }).toISOString()) return Promise.reject();
                    if (actualParameters.observedBefore !== add(sampleEndDate, { days: 1 }).toISOString()) return Promise.reject();
                    return Promise.resolve(dataPoints);
                }
            );

            const result = await queryAsthmaDeviceData('Steps', sampleStartDate, sampleEndDate);

            expect(result).toEqual({
                '2025-05-02': 101,
                '2025-05-03': 200,
                '2025-05-04': 301
            });
        });
    });
});