import { add, Duration, formatISO } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { predictableRandomNumber } from '../predictableRandomNumber';
import { getDayKey } from '../index';

export async function generateSurveyAnswers(startDate: Date, endDate: Date, resultIdentifiers: string[], minValue: number, maxValue: number, dataCadence: Duration): Promise<SurveyAnswer[][]> {
    const data = Array.from({ length: resultIdentifiers.length }, (): SurveyAnswer[] => []);
    let currentDate = startDate;
    while (currentDate < endDate) {
        for (let i = 0; i < data.length; i++) {
            const answer = await predictableRandomNumber(getDayKey(currentDate) + resultIdentifiers[i]);
            data[i].push({
                resultIdentifier: resultIdentifiers[i],
                date: formatISO(add(currentDate, { hours: 12 })),
                answers: [(answer % (maxValue - minValue) + minValue).toString()]
            } as SurveyAnswer);
        }
        currentDate = add(currentDate, dataCadence);
    }

    return data;
}