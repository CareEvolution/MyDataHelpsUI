import { appleHealthStepsDataProvider, fitbitStepsDataProvider, garminStepsDataProvider, googleFitStepsDataProvider, ouraStepsDataProvider } from ".";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { DailyDataQueryResult } from "../query-daily-data";
import { combineResultsUsingMaxValue } from "./daily-data";

export default async function (startDate: Date, endDate: Date, includeGoogleFit?: boolean): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const settings = await MyDataHelps.getDataCollectionSettings();
    if (settings.fitbitEnabled) {
        providers.push(fitbitStepsDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminStepsDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled) {
        providers.push(ouraStepsDataProvider(startDate, endDate));
    }
    if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "HourlySteps")) {
        providers.push(appleHealthStepsDataProvider(startDate, endDate));
    }
    if (includeGoogleFit && settings.queryableDeviceDataTypes.find(s => s.namespace == "GoogleFit" && s.type == "Steps")) {
        providers.push(googleFitStepsDataProvider(startDate, endDate));
    }

    return providers.length ? combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers)) : {};
}
