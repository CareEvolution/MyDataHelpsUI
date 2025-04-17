import { DailyDataQueryResult } from "../query-daily-data";
import { add } from "date-fns";
import getDayKey from "../get-day-key";

export const randomDataProvider = (startDate: Date, endDate: Date, min: number, max: number, wholeNumbersOnly: boolean = true): Promise<DailyDataQueryResult> => {
    const result: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const dayKey = getDayKey(currentDate);
        const value = Math.random() * (max - min) + min;
        result[dayKey] = wholeNumbersOnly ? Math.floor(value) : value;
        currentDate = add(currentDate, { days: 1 });
    }

    return Promise.resolve(result);
};