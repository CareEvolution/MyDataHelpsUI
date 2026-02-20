import { add } from "date-fns";
import { ColorDefinition } from "./colors";
import { queryDailyData, DailyDataQueryResult } from "./query-daily-data";
import getDayKey from "./get-day-key";

export interface RelativeActivityQueryResult {
    relativePercent?: number;
    value: number;
    threshold?: number;
}

export interface RelativeActivityDataType {
    dailyDataType: string;
    color?: ColorDefinition;
    overThresholdColor?: ColorDefinition;
    threshold?: number | "30DayAverage";
    label?: string;
    icon?: React.ReactElement;
    formatter?: (number: number) => string;
}

export function queryRelativeActivity(startDate: Date, endDate: Date, dataTypes: RelativeActivityDataType[], preview: boolean): Promise<{ [key: string]: { [key: string]: RelativeActivityQueryResult } }> {
    let relativeActivityResults: { [key: string]: { [key: string]: RelativeActivityQueryResult } } = {};
    let promises = dataTypes.map(dataType =>
        queryDailyData(
            dataType.dailyDataType,
            add(startDate, { days: dataType.threshold == undefined ? -31 : -1 }),
            add(endDate, { days: 1 }),
            preview));

    return Promise.allSettled(promises).then((results) => {
        dataTypes.forEach((dataType, index) => {
            if (results[index].status === "fulfilled") {
                relativeActivityResults[dataType.dailyDataType] = {};
                const dataTypeData = (results[index] as PromiseFulfilledResult<DailyDataQueryResult>).value;
                const threshold = dataType.threshold === "30DayAverage" || dataType.threshold === undefined
                    ? calculatePrevious30DayAverage(dataTypeData, endDate)
                    : dataType.threshold > 0 ? dataType.threshold : undefined;
                let currentDate = startDate;
                while (currentDate <= endDate) {
                    const dayKey = getDayKey(currentDate);
                    const value = dataTypeData?.[dayKey] ?? 0;
                    relativeActivityResults[dataType.dailyDataType][dayKey] = {
                        value: value
                    };
                    if (threshold !== undefined) {
                        let fillPercent = value / (threshold * 2);
                        if (fillPercent > 1) {
                            fillPercent = 1;
                        }

                        relativeActivityResults[dataType.dailyDataType][dayKey].relativePercent = fillPercent;
                        relativeActivityResults[dataType.dailyDataType][dayKey].threshold = threshold;
                    }
                    currentDate = add(currentDate, { days: 1 });
                }
            }
        });

        return relativeActivityResults;
    });
}

function calculatePrevious30DayAverage(data: { [key: string]: number }, date: Date): number | undefined {
    let sumValues = 0;
    let totalValues = 0;
    for (var i = 1; i < 31; i++) {
        let key = getDayKey(add(date!, { days: -i }));
        if (data[key] !== undefined) {
            sumValues += data[key];
            totalValues++;
        }
    }

    if (totalValues >= 5) {
        return sumValues / totalValues;
    }
}