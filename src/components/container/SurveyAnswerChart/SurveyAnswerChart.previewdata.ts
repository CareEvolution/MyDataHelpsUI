import { add, Duration, min, startOfToday } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { getDayKey, predictableRandomNumber } from '../../../helpers';

export async function getDefaultPreviewData(startDate: Date, endDate: Date, seriesCount: number, dataCadence: Duration) {
    const resultIdentifiers = Array.from({ length: seriesCount }, (_, i) => 'Result ' + i);
    return generateSurveyData(startDate, min([add(startOfToday(), { days: 1 }), endDate]), resultIdentifiers, 10, 100, dataCadence);
}

export async function generateSurveyData(startDate: Date, endDate: Date, resultIdentifiers: string[], minValue: number, maxValue: number, dataCadence: Duration): Promise<SurveyAnswer[][]> {
    const data = Array.from({ length: resultIdentifiers.length }, (): SurveyAnswer[] => []);

    let currentDate = startDate;
    while (currentDate < endDate) {
        for (let i = 0; i < data.length; i++) {
            const answer = await predictableRandomNumber(getDayKey(currentDate) + resultIdentifiers[i]);
            data[i].push({
                date: currentDate.toISOString(),
                answers: [(answer % (maxValue - minValue) + minValue).toString()]
            } as SurveyAnswer);
        }
        currentDate = add(currentDate, dataCadence);
    }

    return data;
}