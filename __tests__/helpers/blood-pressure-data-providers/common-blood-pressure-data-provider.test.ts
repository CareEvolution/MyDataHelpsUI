import { describe, expect, it } from '@jest/globals';
import { DeviceDataPoint, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { buildBloodPressureDataPoints } from '../../../src/helpers/blood-pressure-data-providers/common-blood-pressure-data-provider';

describe('Blood Pressure Data Provider - Helper Functions', () => {
    describe('buildBloodPressureDataPoints', () => {
        it('Should build and return complete blood pressure readings.', async () => {
            const dataPoints: (DeviceDataPoint | DeviceDataV2Point)[] = [
                { type: 'SystolicType', observationDate: '2025-05-02T09:25:23-07:00', value: '115' } as (DeviceDataPoint | DeviceDataV2Point),
                { type: 'SystolicType', observationDate: '2025-05-02T09:30:23-07:00', value: '125' } as (DeviceDataPoint | DeviceDataV2Point),
                { type: 'SystolicType', observationDate: '2025-05-02T09:35:23-06:00', value: '135' } as (DeviceDataPoint | DeviceDataV2Point),
                { type: 'DiastolicType', observationDate: '2025-05-02T09:25:23-07:00', value: '75' } as (DeviceDataPoint | DeviceDataV2Point),
                { type: 'DiastolicType', observationDate: '2025-05-02T09:30:23-07:00', value: '85' } as (DeviceDataPoint | DeviceDataV2Point),
                { type: 'DiastolicType', observationDate: '2025-05-02T09:35:23-06:00', value: '95' } as (DeviceDataPoint | DeviceDataV2Point)
            ];

            const bloodPressureDataPoints = buildBloodPressureDataPoints(dataPoints, 'SystolicType', 'DiastolicType');

            expect(bloodPressureDataPoints.length).toBe(3);

            expect(bloodPressureDataPoints[0].systolic).toBe(115);
            expect(bloodPressureDataPoints[0].diastolic).toBe(75);
            expect(bloodPressureDataPoints[0].date).toEqual(new Date('2025-05-02T09:25:23'));

            expect(bloodPressureDataPoints[1].systolic).toBe(125);
            expect(bloodPressureDataPoints[1].diastolic).toBe(85);
            expect(bloodPressureDataPoints[1].date).toEqual(new Date('2025-05-02T09:30:23'));

            expect(bloodPressureDataPoints[2].systolic).toBe(135);
            expect(bloodPressureDataPoints[2].diastolic).toBe(95);
            expect(bloodPressureDataPoints[2].date).toEqual(new Date('2025-05-02T09:35:23'));
        });

        it('Should ignore readings that do not have both values.', async () => {
            const dataPoints: (DeviceDataPoint | DeviceDataV2Point)[] = [
                { type: 'SystolicType', observationDate: '2025-05-02T09:25:23-07:00', value: '115' } as (DeviceDataPoint | DeviceDataV2Point),
                { type: 'DiastolicType', observationDate: '2025-05-02T09:26:23-07:00', value: '75' } as (DeviceDataPoint | DeviceDataV2Point),
            ];

            const bloodPressureDataPoints = buildBloodPressureDataPoints(dataPoints, 'SystolicType', 'DiastolicType');

            expect(bloodPressureDataPoints.length).toBe(0);
        });

        it('Should ignore readings with the wrong type.', async () => {
            const dataPoints: (DeviceDataPoint | DeviceDataV2Point)[] = [
                { type: 'OtherSystolicType', observationDate: '2025-05-02T09:25:23-07:00', value: '115' } as (DeviceDataPoint | DeviceDataV2Point),
                { type: 'OtherDiastolicType', observationDate: '2025-05-02T09:25:23-07:00', value: '75' } as (DeviceDataPoint | DeviceDataV2Point),
            ];

            const bloodPressureDataPoints = buildBloodPressureDataPoints(dataPoints, 'SystolicType', 'DiastolicType');

            expect(bloodPressureDataPoints.length).toBe(0);
        });
    });
});