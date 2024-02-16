import { DeviceDataNamespace, DeviceDataPoint } from "@careevolution/mydatahelps-js";
import queryAllDeviceData from "../daily-data-providers/query-all-device-data";
import { BloodPressureDataPoint } from ".";
import { parseISO, startOfDay } from "date-fns";

export default async function (namespace: DeviceDataNamespace, bloodPressureSystolic : string, bloodPressureDiastolic : string): Promise<BloodPressureDataPoint[]> {

    function collateAppleHealthResults(dataPoints: DeviceDataPoint[]): BloodPressureDataPoint[] {
        let bpDataPointsByObservationDateTime: Map<string, BloodPressureDataPoint> = new Map<string, BloodPressureDataPoint>();

        dataPoints.forEach((dataPoint) => {
            if (dataPoint.observationDate && !isNaN(Number(dataPoint.value))) {
                var bpDate = parseISO(dataPoint.observationDate);
                var bpDateIdentifier = bpDate.toDateString();
                var exists = bpDataPointsByObservationDateTime.get(bpDateIdentifier);
                var bp: BloodPressureDataPoint = exists ?? { date: startOfDay(bpDate), systolic: 0, diastolic: 0 };
                buildBpDataPoint(dataPoint, bp);
                bpDataPointsByObservationDateTime.set(bpDateIdentifier, bp);
            }
        });

        return Array.from(bpDataPointsByObservationDateTime.values());
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

    return collateAppleHealthResults(dataPoints);
}
