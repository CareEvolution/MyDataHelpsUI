import { add } from "date-fns";
import {
    appleHealthStepsDataProvider,
    fitbitStepsDataProvider,
    garminStepsDataProvider,
    googleFitStepsDataProvider,
} from ".";
import getDayKey from "../get-day-key";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { DailyDataQueryResult } from "../query-daily-data";

export default function (startDate: Date, endDate: Date, includeGoogleFit?: boolean) {
    const providers: Promise<DailyDataQueryResult>[] = [];

    return MyDataHelps.getDataCollectionSettings().then(settings => {
        if (settings.fitbitEnabled) {
            providers.push(fitbitStepsDataProvider(startDate, endDate));
        }
        if (settings.garminEnabled) {
            providers.push(garminStepsDataProvider(startDate, endDate));
        }
        if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "HourlySteps")) {
            providers.push(appleHealthStepsDataProvider(startDate, endDate));
        }
        if (includeGoogleFit && settings.queryableDeviceDataTypes.find(s => s.namespace == "GoogleFit" && s.type == "Steps")) {
            providers.push(googleFitStepsDataProvider(startDate, endDate));
        }

        if (!providers.length) {
            return {};
        }

        return Promise.all(providers).then(providerResults => {
            const result: DailyDataQueryResult = {};

            let currentDate = startDate;
            while (currentDate < endDate) {
                const dayKey = getDayKey(currentDate);
                providerResults.forEach(providerResult => {
                    if (providerResult[dayKey] && (!result[dayKey] || result[dayKey] < providerResult[dayKey])) {
                        result[dayKey] = providerResult[dayKey];
                    }
                });
                currentDate = add(currentDate, { days: 1 });
            }

            return result;
        });
    });
}
