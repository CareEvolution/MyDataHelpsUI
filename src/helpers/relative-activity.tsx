import { add } from "date-fns";
import { ColorDefinition } from "./colors";
import { queryDailyData } from "./query-daily-data";
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
    return Promise.all(promises).then((results) => {
        dataTypes.forEach((dataType, index) => {
            let dataTypeData = results[index];

            relativeActivityResults[dataType.dailyDataType] = {};

            let currentDate = startDate;
            while (currentDate <= endDate) {
                let dayKey = getDayKey(currentDate);
                let value = dataTypeData?.[dayKey] ?? 0;
                let threshold = (dataType.threshold === "30DayAverage" || dataType.threshold === undefined) ? calculatePrevious30DayAverage(dataTypeData, currentDate) : dataType.threshold;
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