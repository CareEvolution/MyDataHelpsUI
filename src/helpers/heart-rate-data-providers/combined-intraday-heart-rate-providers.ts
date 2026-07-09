import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery, DeviceDataV2Namespace } from "@careevolution/mydatahelps-js";
import queryAllDeviceDataV2Aggregates from "../query-all-device-data-v2-aggregates";

export type IntradayHeartRateAggregationOption = "avg" | "min" | "max";
export type IntradayHeartRateData = { [key: number]: number };

function getHeartRateTypeForNamespace(namespace: DeviceDataV2Namespace): string {
    if (namespace === "AppleHealth") return "Heart Rate";
    if (namespace === "Fitbit") return "activities-heart-intraday";
    if (namespace === "Garmin") return "daily-heartRate";
    if (namespace === "GoogleHealth") return "heartRate-list";
    // Oura, Health Connect
    return "heart-rate";
}

// When Fitbit is a data source, transparently fall back to Google Health (Fitbit is being
// retired in favor of it): query Google Health right after Fitbit so Fitbit still wins each
// interval and Google Health only fills the intervals Fitbit is missing.
export function withGoogleHealthFallback(dataSources: DeviceDataV2Namespace[]): DeviceDataV2Namespace[] {
    const fitbitIndex = dataSources.indexOf("Fitbit");
    if (fitbitIndex === -1 || dataSources.includes("GoogleHealth")) {
        return dataSources;
    }
    const withFallback = [...dataSources];
    withFallback.splice(fitbitIndex + 1, 0, "GoogleHealth");
    return withFallback;
}

export default async function (dataSources: DeviceDataV2Namespace[], startDate: Date, endDate: Date,
    aggregationOption: IntradayHeartRateAggregationOption, aggregationIntervalMinutes: number): Promise<IntradayHeartRateData> {

    var providers: Promise<DeviceDataV2Aggregate[]>[] = [];
    var data: IntradayHeartRateData = {};

    withGoogleHealthFallback(dataSources).forEach(dataSource => {
        const params: DeviceDataV2AggregateQuery = {
            type: getHeartRateTypeForNamespace(dataSource),
            namespace: dataSource,
            observedAfter: startDate.toISOString(),
            observedBefore: endDate.toISOString(),
            intervalAmount: aggregationIntervalMinutes,
            intervalType: "Minutes",
            aggregateFunctions: [aggregationOption]
        };

        providers.push(queryAllDeviceDataV2Aggregates(params)
            .catch(() => { return []; }));
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

        let entries = Object.entries(data);
        entries.sort((a, b) => Number(a[0]) - Number(b[0]));
        return Object.fromEntries(entries);
    });
}