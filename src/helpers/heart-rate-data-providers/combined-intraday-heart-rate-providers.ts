import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery, DeviceDataV2Namespace } from "@careevolution/mydatahelps-js";
import queryAllDeviceDataV2 from "../query-all-device-data-v2";

export type IntradayHeartRateAggregationOption = "avg" | "count" | "min" | "max" | "sum";
export type IntradayHeartRateData = { [key: number]: DeviceDataV2Aggregate };


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
        values.forEach((nameSpaceData) => {
            nameSpaceData.forEach((intervalData) => {
                var dayKey = (new Date(intervalData.date)).getTime();
                if (!data[dayKey]) {
                    data[dayKey] = intervalData;
                }
            });
        });

        return data;
    });
}