import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery, DeviceDataV2Namespace } from "@careevolution/mydatahelps-js";
import queryAllDeviceDataV2 from "../query-all-device-data-v2";

export type IntradayHeartRateAggregationOption = "avg" | "min" | "max";
export type IntradayHeartRateData = { [key: number]: number };

export default async function (dataSources: DeviceDataV2Namespace[], startDate: Date, endDate: Date,
    aggregationOption: IntradayHeartRateAggregationOption, aggregationIntervalMinutes: number): Promise<IntradayHeartRateData> {

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

    return Promise.all(providers).then((values) => {
        let data: IntradayHeartRateData = {};
        values.forEach((nameSpaceData) => {
            nameSpaceData.forEach((intervalData) => {
                var dataKey = (new Date(intervalData.date)).getTime();
                if (!data[dataKey]) {
                    data[dataKey] = intervalData.statistics[aggregationOption];
                }
            });
        });

        return data;
    });
}