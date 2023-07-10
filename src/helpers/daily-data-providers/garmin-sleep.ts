import { add, formatISO, parseISO } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

function querySleep(property: string, startDate: Date, endDate: Date, sumValues: boolean, divideBy?: number) {
    return queryAllDeviceData({
        namespace: "Garmin",
        type: "Sleep",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    }).then(function (ddp) {
        var data: { [key: string]: number } = {};
        ddp.forEach((d) => {
            if (!d.observationDate) { return; }
            if (!d.properties) { return; }
            if (!d.properties[property]) { return; }
            if (parseInt(d.properties[property]) <= 0) { return; }

            var dataKey = formatISO(add(parseISO(d.observationDate)!, { hours: 6 })).substr(0, 10);

            let value = parseFloat(d.properties[property]);
            if (value < 0) { return; }

            if (divideBy) {
                value = value / divideBy;
            }

            if (!data[dataKey]) {
                data[dataKey] = value;
            } else if (sumValues) {
                data[dataKey] += parseFloat(d.properties[property]);
            }
        });
        return data;
    });
}

export function totalSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep("DurationInSeconds", startDate, endDate, true, 60);
}

export function remSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep("RemSleepInSeconds", startDate, endDate, true, 60);
}

export function deepSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep("DeepSleepDurationInSeconds", startDate, endDate, true, 60);
}

export function lightSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep("LightSleepDurationInSeconds", startDate, endDate, true, 60);
}

export function awakeSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep("AwakeDurationInSeconds", startDate, endDate, true, 60);
}

export function sleepScore(startDate: Date, endDate: Date) {
    return querySleep("OverallSleepScore.Value", startDate, endDate, false);
}