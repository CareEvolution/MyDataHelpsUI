import { add, startOfDay } from "date-fns";
import { DeviceDataV2Aggregate } from "@careevolution/mydatahelps-js";

const today = startOfDay(new Date());

function addHour(date: Date, days: number) {
    return add(date, { hours: days });
}

let halfDayData: DeviceDataV2Aggregate[] = [
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: today.toISOString(), statistics: { "avg": 78.30281818181818 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addHour(today, 1).toISOString(), statistics: { "avg": 76.54375 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addHour(today, 2).toISOString(), statistics: { "avg": 65.58441666666668 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addHour(today, 3).toISOString(), statistics: { "avg": 57.68449999999999 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addHour(today, 4).toISOString(), statistics: { "avg": 64.594 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addHour(today, 5).toISOString(), statistics: { "avg": 248.99266666666666 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addHour(today, 6).toISOString(), statistics: { "avg": 53.66227272727272 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addHour(today, 7).toISOString(), statistics: { "avg": 51.272999999999996 } }];

let fullDayData: DeviceDataV2Aggregate[] = [
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": today.toISOString(), "statistics": { "avg": [50.06752576488239] } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 1).toISOString(), statistics: { "avg": 80.650704600784884 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 2).toISOString(), statistics: { "avg": 100.833349270271746 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 3).toISOString(), statistics: { "avg": 64.8362429614913 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 4).toISOString(), statistics: { "avg": 64.1982691749681 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 5).toISOString(), statistics: { "avg": 64.96667107960806 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 6).toISOString(), statistics: { "avg": 65.19208831093269 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 7).toISOString(), statistics: { "avg": 67.18182579787992 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 8).toISOString(), statistics: { "avg": 67.50059869370526 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 9).toISOString(), statistics: { "avg": 67.45237558978994 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 10).toISOString(), statistics: { "avg": 100.85840664801175 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 11).toISOString(), statistics: { "avg": 188.18445871993444 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 12).toISOString(), statistics: { "avg": 120.77792632679497 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 13).toISOString(), statistics: { "avg": 72.89466097091174 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 14).toISOString(), statistics: { "avg": 71.56568004191139 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 15).toISOString(), statistics: { "avg": 74.3166757860288 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 16).toISOString(), statistics: { "avg": 74.00729856571137 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 17).toISOString(), statistics: { "avg": 75.97397759650349 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 18).toISOString(), statistics: { "avg": 75.5817570178811 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 19).toISOString(), statistics: { "avg": 60 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 20).toISOString(), statistics: { "avg": 75.84768636204112 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 21).toISOString(), statistics: { "avg": 90.98330966983049 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 22).toISOString(), statistics: { "avg": 78.82201252340671 } },
    { participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", "date": addHour(today, 23).toISOString(), statistics: { "avg": 79.97448065222528 } }
];

export { fullDayData as FullDayData };
export { halfDayData as HalfDayData };