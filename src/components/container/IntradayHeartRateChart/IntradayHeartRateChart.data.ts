import { add, startOfDay } from "date-fns";
import { DeviceDataV2AggregateReduced } from "../../../helpers/heart-rate-data-providers/intraday-aggregates";

const today = startOfDay(new Date());

function addHour(date: Date, days: number) {
    return add(date, { hours: days });
}

let halfDayData: DeviceDataV2AggregateReduced[] = [
    { "date": today, "statisticValue": 78.30281818181818 },
    { "date": addHour(today, 1), "statisticValue": 76.54375 },
    { "date": addHour(today, 2), "statisticValue": 65.58441666666668 },
    { "date": addHour(today, 3), "statisticValue": 57.68449999999999 },
    { "date": addHour(today, 4), "statisticValue": 64.594 },
    { "date": addHour(today, 5), "statisticValue": 248.99266666666666 },
    { "date": addHour(today, 6), "statisticValue": 53.66227272727272 },
    { "date": addHour(today, 7), "statisticValue": 51.272999999999996 }];

let fullDayData: DeviceDataV2AggregateReduced[] = [
    { "date": today, "statisticValue": 50.06752576488239 },
    { "date": addHour(today, 1), "statisticValue": 80.650704600784884 },
    { "date": addHour(today, 2), "statisticValue": 100.833349270271746 },
    { "date": addHour(today, 3), "statisticValue": 64.8362429614913 },
    { "date": addHour(today, 4), "statisticValue": 64.1982691749681 },
    { "date": addHour(today, 5), "statisticValue": 64.96667107960806 },
    { "date": addHour(today, 6), "statisticValue": 65.19208831093269 },
    { "date": addHour(today, 7), "statisticValue": 67.18182579787992 },
    { "date": addHour(today, 8), "statisticValue": 67.50059869370526 },
    { "date": addHour(today, 9), "statisticValue": 67.45237558978994 },
    { "date": addHour(today, 10), "statisticValue": 100.85840664801175 },
    { "date": addHour(today, 11), "statisticValue": 188.18445871993444 },
    { "date": addHour(today, 12), "statisticValue": 120.77792632679497 },
    { "date": addHour(today, 13), "statisticValue": 72.89466097091174 },
    { "date": addHour(today, 14), "statisticValue": 71.56568004191139 },
    { "date": addHour(today, 15), "statisticValue": 74.3166757860288 },
    { "date": addHour(today, 16), "statisticValue": 74.00729856571137 },
    { "date": addHour(today, 17), "statisticValue": 75.97397759650349 },
    { "date": addHour(today, 18), "statisticValue": 75.5817570178811 },
    { "date": addHour(today, 19), "statisticValue": 60 },
    { "date": addHour(today, 20), "statisticValue": 75.84768636204112 },
    { "date": addHour(today, 21), "statisticValue": 90.98330966983049 },
    { "date": addHour(today, 22), "statisticValue": 78.82201252340671 },
    { "date": addHour(today, 23), "statisticValue": 79.97448065222528 }
];

export { fullDayData as FullDayData };
export { halfDayData as HalfDayData };