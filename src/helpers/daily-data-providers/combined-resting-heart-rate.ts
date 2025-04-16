import { add } from "date-fns";
import {
    appleHealthRestingHeartRateDataProvider,
    fitbitRestingHeartRateDataProvider,
    garminRestingHeartRateDataProvider,
    ouraRestingHeartRateDataProvider,
    healthConnectRestingHeartRateDataProvider
} from ".";
import getDayKey from "../get-day-key";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";

export default async function (
    startDate: Date,
    endDate: Date
): Promise<Record<string, number>> {
    const providers: Promise<Record<string, number>>[] = [];

    const combinedSettings = await getCombinedDataCollectionSettings(true);
    const { settings, deviceDataV2Types } = combinedSettings;

    if (settings.fitbitEnabled) {
        providers.push(fitbitRestingHeartRateDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminRestingHeartRateDataProvider(startDate, endDate));
    }
    if (
        settings.appleHealthEnabled &&
        settings.queryableDeviceDataTypes.some(
            ddt =>
                ddt.namespace === "AppleHealth" &&
                ddt.type === "RestingHeartRate"
        )
    ) {
        providers.push(
            appleHealthRestingHeartRateDataProvider(startDate, endDate)
        );
    }
    if (
        settings.healthConnectEnabled &&
        deviceDataV2Types.some(
            ddt =>
                ddt.namespace === "HealthConnect" &&
                ddt.type === "resting-heart-rate"
        )
    ) {
        providers.push(
            healthConnectRestingHeartRateDataProvider(startDate, endDate)
        );
    }
    if (
        settings.ouraEnabled &&
        deviceDataV2Types.some(
            ddt => ddt.namespace === "Oura" && ddt.type === "sleep"
        )
    ) {
        providers.push(ouraRestingHeartRateDataProvider(startDate, endDate));
    }
    if (!providers.length) {
        return {};
    }

    const values = await Promise.all(providers);
    const data: Record<string, number> = {};
    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        const heartRates: number[] = [];
        values.forEach(value => {
            if (value[dayKey] && value[dayKey] > 0) {
                heartRates.push(value[dayKey]);
            }
        });
        if (heartRates.length > 0) {
            data[dayKey] = Math.round(
                heartRates.reduce((a, b) => a + b) / heartRates.length
            );
        }
        currentDate = add(currentDate, { days: 1 });
    }
    return data;
}
