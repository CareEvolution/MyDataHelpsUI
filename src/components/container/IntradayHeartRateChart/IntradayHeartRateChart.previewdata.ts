import { addMinutes, startOfDay } from "date-fns";
import { DeviceDataV2Aggregate } from "@careevolution/mydatahelps-js";
import { IntradayHeartRateData } from '../../../helpers/heart-rate-data-providers/combined-avg-intraday-heart-rate-providers'
const today = startOfDay(new Date());

function getRandomInt(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadForTest(data: DeviceDataV2Aggregate[]) {
    var testData : IntradayHeartRateData = {};
    data.forEach((data) => {
        testData[(new Date(data.date)).getTime()] = data.statistics.avg;
    });
    return testData;
}

let testData: DeviceDataV2Aggregate[] = [];
for (let i = 0; i < 48; i++) {
    testData.push({ participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addMinutes(today, (i * 5)).toISOString(), statistics: { "avg": getRandomInt(80, 185) } });
}
const halfDayData = loadForTest(testData);

testData = [];
for (let i = 0; i < 288; i++) {
    testData.push({ participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addMinutes(today, (i * 5)).toISOString(), statistics: { "avg": getRandomInt(0, 200) } });
}
const fullDayData = loadForTest(testData);

testData = [];
for (let i = 0; i < 48; i++) {
    testData.push({ participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addMinutes(today, (i * 5)).toISOString(), statistics: { "avg": getRandomInt(0, 200) } });
}

for (let i = 200; i < 288; i++) {
    testData.push({ participantID: "ABCDEFG", participantIdentifier: "ABCDEFG", date: addMinutes(today, (i * 5)).toISOString(), statistics: { "avg": getRandomInt(50, 150) } });
}
const missingMidDayData = loadForTest(testData);

export { fullDayData as FullDayData };
export { halfDayData as HalfDayData };
export { missingMidDayData as MissingMidDayData };