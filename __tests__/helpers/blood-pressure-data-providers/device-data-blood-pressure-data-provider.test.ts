import { describe, expect, it } from '@jest/globals';
import deviceDataBloodPressureDataProvider from '../../../src/helpers/blood-pressure-data-providers/device-data-blood-pressure-data-provider';
import * as deviceDataQueryFunctions from '../../../src/helpers/daily-data-providers/query-all-device-data';
import * as bloodPressureHelperFunctions from '../../../src/helpers/blood-pressure-data-providers/common-blood-pressure-data-provider';
import { DeviceDataNamespace, DeviceDataPoint, DeviceDataPointQuery, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { BloodPressureDataPoint } from '../../../src';

describe('Blood Pressure Data Provider', () => {
    it('Should query for data and return the blood pressure readings.', async () => {
        const dataPoints: DeviceDataPoint[] = [{} as DeviceDataPoint];
        jest.spyOn(deviceDataQueryFunctions, 'default').mockImplementation(
            (actualParameters: DeviceDataPointQuery): Promise<DeviceDataPoint[]> => {
                if (actualParameters.namespace !== 'TestNamespace' as DeviceDataNamespace) return Promise.reject();
                if (JSON.stringify(actualParameters.type) !== JSON.stringify(['SystolicType', 'DiastolicType'])) return Promise.reject();
                return Promise.resolve(dataPoints);
            }
        );

        const bpDataPoints: BloodPressureDataPoint[] = [{} as BloodPressureDataPoint];
        jest.spyOn(bloodPressureHelperFunctions, 'buildBloodPressureDataPoints').mockImplementation(
            (actualDataPoints: (DeviceDataPoint | DeviceDataV2Point)[], actualSystolicType: string, actualDiastolicType: string): BloodPressureDataPoint[] => {
                if (actualDataPoints !== dataPoints) return [];
                if (actualSystolicType !== 'SystolicType') return [];
                if (actualDiastolicType !== 'DiastolicType') return [];
                return bpDataPoints;
            }
        );

        const result = await deviceDataBloodPressureDataProvider('TestNamespace' as DeviceDataNamespace, 'SystolicType', 'DiastolicType');

        expect(result).toBe(bpDataPoints);
    });
});