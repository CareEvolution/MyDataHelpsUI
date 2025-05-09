import { DeviceDataPoint, DeviceDataV2Point } from "@careevolution/mydatahelps-js";
import { BloodPressureDataPoint } from ".";
import { parseISOWithoutOffset } from '../date-helpers';

export function buildBloodPressureDataPoints(
    dataPoints: (DeviceDataPoint | DeviceDataV2Point)[],
    systolicType: string,
    diastolicType: string
): BloodPressureDataPoint[] {
    const bpDataPoints: BloodPressureDataPoint[] = [];

    const bpDataPointCache: Record<string, BloodPressureDataPoint> = {};
    dataPoints.filter(dataPoint => dataPoint.observationDate && parseInt(dataPoint.value) > 0).forEach(dataPoint => {
        const cacheKey = dataPoint.observationDate!;
        const bpDataPoint = bpDataPointCache[cacheKey] ?? { date: parseISOWithoutOffset(dataPoint.observationDate!), systolic: 0, diastolic: 0 };
        bpDataPointCache[cacheKey] = bpDataPoint;

        // @ts-ignore
        if (dataPoint.type === systolicType) {
            bpDataPoint.systolic = parseInt(dataPoint.value);
        } else if (// @ts-ignore
            dataPoint.type === diastolicType) {
            bpDataPoint.diastolic = parseInt(dataPoint.value);
        }

        if (bpDataPoint.systolic !== 0 && bpDataPoint.diastolic !== 0) {
            bpDataPoints.push(bpDataPoint);
            delete bpDataPointCache[cacheKey];
        }
    });

    return bpDataPoints;
}
