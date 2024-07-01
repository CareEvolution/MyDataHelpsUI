import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery, DeviceDataV2Namespace } from "@careevolution/mydatahelps-js";
import queryAllDeviceDataV2 from "../query-all-device-data-v2";

export type IntradayHeartRateData = { [key: string]: number };

export default async function (dataSources: DeviceDataV2Namespace[], startDate: Date, endDate: Date,
    aggregationIntervalMinutes: number): Promise<IntradayHeartRateData> {

    const aggregationOption = "avg";
    var providers: Promise<DeviceDataV2Aggregate[]>[] = [];
    var data: IntradayHeartRateData = {};

    dataSources.forEach(dataSource => {
        const params: DeviceDataV2AggregateQuery = {
            type: dataSource === "Fitbit" ? "activities-heart-intraday" : "Heart Rate",
            namespace: dataSource,
            observedAfter: startDate.toISOString(),
            observedBefore: endDate.toISOString(),
            intervalAmount: aggregationIntervalMinutes,
            intervalType: "Minutes",
            aggregateFunctions: [aggregationOption]
        };

        providers.push(queryAllDeviceDataV2(params));
    });

    if (providers.length == 0) {
        return data;
    }

    const buildRunningAverage = function (existing: any, newData: DeviceDataV2Aggregate) {
        return { runningAverage: (existing.runningAverage + newData.statistics[aggregationOption]) / existing + 1, count: existing.count + 1 };
    }

    return Promise.all(providers).then((values) => {
        let data: IntradayHeartRateData = {};
        var runningAverage: { [key: number]: { runningAverage: number, count: number } } = {};
        values.forEach((nameSpaceData) => {
            nameSpaceData.forEach((intervalData) => {
                var dayKey = (new Date(intervalData.date)).getTime();
                if (data[dayKey]) {
                    let avg = buildRunningAverage(data[dayKey], intervalData);
                    runningAverage[dayKey] = avg;
                    data[dayKey] = avg.runningAverage;
                } else {
                    runningAverage[dayKey] = { runningAverage: intervalData.statistics[aggregationOption], count: 1 };
                    data[dayKey] = intervalData.statistics[aggregationOption];
                }
            });
        });

        return data;
    });
}