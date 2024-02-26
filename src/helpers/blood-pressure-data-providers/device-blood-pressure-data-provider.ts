import { DeviceDataNamespace, DeviceDataPoint } from "@careevolution/mydatahelps-js";
import queryAllDeviceData from "../daily-data-providers/query-all-device-data";
import { BloodPressureDataPoint } from ".";
import { parseISO, startOfDay } from "date-fns";

export default async function (namespace: DeviceDataNamespace, bloodPressureSystolic: string, bloodPressureDiastolic: string): Promise<BloodPressureDataPoint[]> {

    function collateResults(dataPoints: DeviceDataPoint[]): BloodPressureDataPoint[] {
        let bpDataPointsByObservationDateTime: Map<string, BloodPressureDataPoint> = new Map<string, BloodPressureDataPoint>();
        let complete: BloodPressureDataPoint[] = [];

        dataPoints.forEach((dataPoint) => {
            if (dataPoint.observationDate && !isNaN(Number(dataPoint.value))) {
                var bpDate = parseISO(dataPoint.observationDate);
                var exists = bpDataPointsByObservationDateTime.get(dataPoint.observationDate);
                var bp: BloodPressureDataPoint = exists ?? { date: startOfDay(bpDate), systolic: 0, diastolic: 0 };
                buildBpDataPoint(dataPoint, bp);
                bpDataPointsByObservationDateTime.set(dataPoint.observationDate, bp);
                if (bp.systolic !== 0 && bp.diastolic !== 0) {
                    complete.push(bp);
                }
            }
        });

        return complete;
    }

    function buildBpDataPoint(dataPoint: DeviceDataPoint, bpDataPoint: BloodPressureDataPoint) {
        if (dataPoint.type === bloodPressureSystolic) {
            bpDataPoint.systolic = Number(dataPoint.value);
        } else if (dataPoint.type === bloodPressureDiastolic) {
            bpDataPoint.diastolic = Number(dataPoint.value);
        }
    }

    const dataPoints = await queryAllDeviceData({
        namespace: namespace,
        type: [bloodPressureSystolic, bloodPressureDiastolic]
    });

    return collateResults(dataPoints);
}
