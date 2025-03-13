import { add } from "date-fns";
import { appleHealthSleepDataProvider, fitbitTotalSleepMinutesDataProvider, garminTotalSleepMinutesDataProvider, ouraSleepMinutesDataProvider, } from ".";
import getDayKey from "../get-day-key";
import MyDataHelps from "@careevolution/mydatahelps-js";

export default function (startDate: Date, endDate: Date) {
    let providers: Promise<{ [key: string]: number }>[] = [];

    return MyDataHelps.getDataCollectionSettings().then((settings) => {
        if (settings.fitbitEnabled) {
            providers.push(fitbitTotalSleepMinutesDataProvider(startDate, endDate));
        }
        if (settings.garminEnabled) {
            providers.push(garminTotalSleepMinutesDataProvider(startDate, endDate));
        }
        if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "SleepAnalysisInterval")) {
            providers.push(appleHealthSleepDataProvider(startDate, endDate));
        }
		if (settings.ouraEnabled) {
			providers.push(ouraSleepMinutesDataProvider(startDate, endDate));
		}

        if (!providers.length) {
            return {};
        }

        return Promise.all(providers).then((values) => {
            var data: { [key: string]: number } = {};
            while (startDate < endDate) {
                var dayKey = getDayKey(startDate);
                var sleep: number | null = null;
                values.forEach((value) => {
                    if (value[dayKey] && (sleep == null || sleep < value[dayKey])) {
                        sleep = value[dayKey];
                    }
                });
                if (sleep) {
                    data[dayKey] = sleep;
                }
                startDate = add(startDate, { days: 1 });
            }
            return data;
        });
    });
}
