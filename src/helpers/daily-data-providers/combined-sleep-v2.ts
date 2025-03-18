import { add } from "date-fns";
import { totalSleepMinutes as fitbitTotalSleepMinutesDataProvider } from "./fitbit-sleep-v2";
import { totalSleepMinutes as garminTotalSleepMinutesDataProvider } from "./garmin-sleep-v2";
import { totalSleepMinutes as appleHealthSleepMinutesDataProvider } from "./apple-health-sleep-v2";
import { totalSleepMinutes as healthConnectTotalSleepMinutesDataProvider } from "./health-connect-sleep";
import getDayKey from "../get-day-key";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";

export default async function (
    startDate: Date,
    endDate: Date
): Promise<Record<string, number>> {
    const providers: Promise<Record<string, number>>[] = [];

    const useV2 = true;
    const combinedSettings = await getCombinedDataCollectionSettings(useV2);
    const { settings, deviceDataV2Types } = combinedSettings;

    if (settings.fitbitEnabled) {
        providers.push(fitbitTotalSleepMinutesDataProvider(startDate, endDate));
    }

    if (settings.garminEnabled) {
        providers.push(garminTotalSleepMinutesDataProvider(startDate, endDate));
    }

    if (
        settings.appleHealthEnabled &&
        settings.queryableDeviceDataTypes.some(
            ddt =>
                ddt.namespace === "AppleHealth" &&
                ddt.type === "SleepAnalysisInterval"
        )
    ) {
        providers.push(appleHealthSleepMinutesDataProvider(startDate, endDate));
    }

    if (
        settings.healthConnectEnabled &&
        deviceDataV2Types.some(
            ddt =>
                ddt.enabled &&
                ddt.namespace === "HealthConnect" &&
                ddt.type === "sleep"
        )
    ) {
        providers.push(
            healthConnectTotalSleepMinutesDataProvider(startDate, endDate)
        );
    }

    if (!providers.length) {
        return {};
    }

    const results = await Promise.all(providers);
    const data: Record<string, number> = {};

    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        let sleepMinutes: number | undefined;

        results
            .filter(result => result.hasOwnProperty(dayKey))
            .forEach(result => {
                if (
                    sleepMinutes === undefined ||
                    result[dayKey] > sleepMinutes
                ) {
                    sleepMinutes = result[dayKey];
                }
            });

        if (sleepMinutes) {
            data[dayKey] = sleepMinutes;
        }

        currentDate = add(currentDate, { days: 1 });
    }

    return data;
}
