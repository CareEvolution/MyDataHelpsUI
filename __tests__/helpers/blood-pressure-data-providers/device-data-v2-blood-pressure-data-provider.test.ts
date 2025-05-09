import { describe, expect, it } from '@jest/globals';
import deviceDataBloodPressureDataProviderV2 from '../../../src/helpers/blood-pressure-data-providers/device-data-v2-blood-pressure-data-provider';
import * as deviceDataQueryFunctions from '../../../src/helpers/query-all-device-data-v2';
import * as bloodPressureHelperFunctions from '../../../src/helpers/blood-pressure-data-providers/common-blood-pressure-data-provider';
import { DeviceDataPoint, DeviceDataV2Namespace, DeviceDataV2Point, DeviceDataV2Query } from '@careevolution/mydatahelps-js';
import { BloodPressureDataPoint } from '../../../src';

describe('Blood Pressure Data Provider - V2', () => {
    it('Should query for data and return the blood pressure readings.', async () => {
        const systolicDataPoints: DeviceDataV2Point[] = [{ identifier: 'Systolic' } as DeviceDataV2Point];
        const diastolicDataPoints: DeviceDataV2Point[] = [{ identifier: 'Diastolic' } as DeviceDataV2Point];
        jest.spyOn(deviceDataQueryFunctions, 'default').mockImplementation(
            (actualParameters: DeviceDataV2Query): Promise<DeviceDataV2Point[]> => {
                if (actualParameters.namespace !== 'TestNamespace' as DeviceDataV2Namespace) return Promise.reject();
                if (actualParameters.type !== 'SystolicType' && actualParameters.type !== 'DiastolicType') return Promise.reject();
                return Promise.resolve(actualParameters.type === 'SystolicType' ? systolicDataPoints : diastolicDataPoints);
            }
        );

        const bpDataPoints: BloodPressureDataPoint[] = [{} as BloodPressureDataPoint];
        jest.spyOn(bloodPressureHelperFunctions, 'buildBloodPressureDataPoints').mockImplementation(
            (actualDataPoints: (DeviceDataPoint | DeviceDataV2Point)[], actualSystolicType: string, actualDiastolicType: string): BloodPressureDataPoint[] => {
                if (JSON.stringify(actualDataPoints) !== JSON.stringify(systolicDataPoints.concat(diastolicDataPoints))) return [];
                if (actualSystolicType !== 'SystolicType') return [];
                if (actualDiastolicType !== 'DiastolicType') return [];
                return bpDataPoints;
            }
        );

        const result = await deviceDataBloodPressureDataProviderV2('TestNamespace' as DeviceDataV2Namespace, 'SystolicType', 'DiastolicType');

        expect(result).toBe(bpDataPoints);
    });
});