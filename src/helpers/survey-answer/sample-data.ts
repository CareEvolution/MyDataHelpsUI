import { add, Duration, formatISO } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { fnvPredictableRandomNumber } from '../predictableRandomNumber';
import { getDayKey } from '../index';

export function generateSurveyAnswers(startDate: Date, endDate: Date, resultIdentifiers: string[], minValue: number, maxValue: number, dataCadence: Duration): SurveyAnswer[][] {
    const data = Array.from({ length: resultIdentifiers.length }, (): SurveyAnswer[] => []);

    let currentDate = startDate;
    while (currentDate < endDate) {
        for (let i = 0; i < data.length; i++) {
            const answer = fnvPredictableRandomNumber(getDayKey(currentDate) + resultIdentifiers[i]);
            data[i].push({
                stepIdentifier: resultIdentifiers[i],
                resultIdentifier: resultIdentifiers[i],
                date: formatISO(add(currentDate, { hours: 12 })),
                answers: [(answer % (maxValue - minValue) + minValue).toString()]
            } as SurveyAnswer);
        }
        currentDate = add(currentDate, dataCadence);
    }

    return data;
}