import { add } from "date-fns";
import {
    appleHealthSleepDataProvider,
    fitbitTotalSleepMinutesDataProvider,
    garminTotalSleepMinutesDataProvider,
    healthConnectTotalSleepMinutesDataProvider,
} from ".";
import getDayKey from "../get-day-key";
import { DataCollectionSettings } from "./data-collection-settings";


export default async function (startDate: Date, endDate: Date) {
    const settings = await DataCollectionSettings.create();
    const providers: Promise<Record<string, number>>[] = [];

    if (settings.isEnabled( "Fitbit" )) {
        providers.push(fitbitTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.isEnabled( "Garmin" )) {
        providers.push(garminTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.isEnabled( "AppleHealth", "SleepAnalysisInterval" )) {
        providers.push(appleHealthSleepDataProvider(startDate, endDate));
    }
    if (settings.isEnabled( "HealthConnect", "sleep")) {
        providers.push(healthConnectTotalSleepMinutesDataProvider(startDate, endDate));
    }

    if (!providers.length) {
        return {};
    }

    const values = await Promise.all(providers);
    const data: Record<string, number> = {};

    while (startDate < endDate) {
        const dayKey = getDayKey(startDate);
        let maxSleep: number | null = null;

        values.forEach((value) => {
            if (value[dayKey] && (maxSleep == null || maxSleep < value[dayKey])) {
                maxSleep = value[dayKey];
            }
        });

        if (maxSleep !== null) {
            data[dayKey] = maxSleep;
        }

        startDate = add(startDate, { days: 1 });
    }

    return data;
}
