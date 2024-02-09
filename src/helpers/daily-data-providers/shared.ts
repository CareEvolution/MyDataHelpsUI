import { DeviceDataPoint } from "@careevolution/mydatahelps-js";
import { DailyDataQueryResult } from "../query-daily-data";
import { add, parseISO } from "date-fns";
import getDayKey from "../get-day-key";

export const collateMaxValueDataPointsByDate = (dataPoints: DeviceDataPoint[]): DailyDataQueryResult => {
    let result: DailyDataQueryResult = {};

    dataPoints.forEach((dataPoint) => {
        if (!dataPoint.observationDate) return;

        let observationDate = parseISO(dataPoint.observationDate);
        let dayKey = getDayKey(observationDate);
        let value = parseFloat(dataPoint.value);
        if (!result[dayKey] || value > result[dayKey]) {
            result[dayKey] = value;
        }
    });

    return result;
};

export const randomDataProvider = (start: Date, end: Date, min: number, max: number, wholeNumbersOnly: boolean = true): Promise<DailyDataQueryResult> => {
    let result: DailyDataQueryResult = {};

    let currentDate = new Date(start);
    while (currentDate < end) {
        let dayKey = getDayKey(currentDate);
        let value = Math.random() * (max - min) + min;
        result[dayKey] = wholeNumbersOnly ? Math.floor(value) : value;
        currentDate = add(currentDate, {days: 1});
    }

    return Promise.resolve(result);
};