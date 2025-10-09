import { DailyDataQueryResult } from '../query-daily-data';
import { getDayKey } from '../index';
import { add } from 'date-fns';

export function generateSampleData(startDate: Date, endDate: Date, min: number, max: number) {
    const result: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const currentDayKey = getDayKey(currentDate);
        if (getRandomNumber(0, 1) !== 0) {
            result[currentDayKey] = getRandomNumber(min, max);
        }
        currentDate = add(currentDate, { days: 1 });
    }

    return result;
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}