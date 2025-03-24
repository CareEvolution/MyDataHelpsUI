import { add } from "date-fns";
import {
    appleHealthSleepDataProvider,
    fitbitTotalSleepMinutesDataProvider,
    garminTotalSleepMinutesDataProvider,
    ouraSleepMinutesDataProvider,
    healthConnectTotalSleepMinutesDataProvider
} from ".";
import getDayKey from "../get-day-key";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";

export default async function (startDate: Date, endDate: Date) {
    const useV2 = true;
    const combinedSettings = await getCombinedDataCollectionSettings(useV2);
    const { settings, deviceDataV2Types } = combinedSettings;

    const providers: Promise<Record<string, number>>[] = [];

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
        providers.push(appleHealthSleepDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled) {
	   providers.push(ouraSleepMinutesDataProvider(startDate, endDate));
    }
    if (
        settings.healthConnectEnabled &&
        deviceDataV2Types.some(
            ddt => ddt.namespace === "HealthConnect" && ddt.type === "sleep"
        )
    ) {
        providers.push(
            healthConnectTotalSleepMinutesDataProvider(startDate, endDate)
        );
    }

    if (!providers.length) {
        return {};
    }

    const values = await Promise.all(providers);
    const data: Record<string, number> = {};

    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        let maxSleep: number | null = null;

        values.forEach(value => {
            if (
                value[dayKey] &&
                (maxSleep == null || maxSleep < value[dayKey])
            ) {
                maxSleep = value[dayKey];
            }
        });

        if (maxSleep !== null) {
            data[dayKey] = maxSleep;
        }

        currentDate = add(currentDate, { days: 1 });
    }

    return data;
}
