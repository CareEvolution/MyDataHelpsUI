import { add, Duration, formatISO, min, startOfToday } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { getDayKey, predictableRandomNumber } from '../../../helpers';

export type SurveyAnswerChartPreviewState = 'default' | 'no data' | 'with one data point' | 'with one data point in first series' | 'with two data points' | 'with two data points in first series' | 'with two data points in first series with gap' | 'with gap';

export async function generatePreviewData(previewState: SurveyAnswerChartPreviewState | undefined, startDate: Date, endDate: Date, seriesCount: number, dataCadence: Duration): Promise<SurveyAnswer[][]> {
    const previewDataProvider = (startDate: Date, endDate: Date) => {
        const resultIdentifiers = Array.from({ length: seriesCount }, (_, i) => 'Result ' + i);
        return generateSurveyAnswers(startDate, endDate, resultIdentifiers, 10, 100, dataCadence);
    };
    return getPreviewDataFromProvider(previewState, startDate, endDate, previewDataProvider);
}

export async function getPreviewDataFromProvider(previewState: SurveyAnswerChartPreviewState | undefined, startDate: Date, endDate: Date, previewDataProvider: (startDate: Date, endDate: Date) => Promise<SurveyAnswer[][]>): Promise<SurveyAnswer[][]> {
    if (!previewState || previewState === 'no data') return [];

    const surveyAnswers = await previewDataProvider(startDate, min([add(startOfToday(), { days: 1 }), endDate]));

    if (previewState === 'with one data point') {
        return surveyAnswers.map(sa => [sa[0]]);
    }

    if (previewState === 'with one data point in first series') {
        return surveyAnswers.map((sa, index) => index === 0 ? [sa[Math.floor(sa.length / 3)]] : sa);
    }

    if (previewState === 'with two data points') {
        return surveyAnswers.map(sa => [sa[0], sa[1]]);
    }

    if (previewState === 'with two data points in first series') {
        return surveyAnswers.map((sa, index) => index === 0 ? [sa[1], sa[2]] : sa);
    }

    if (previewState === 'with two data points in first series with gap') {
        return surveyAnswers.map((sa, index) => index === 0 ? [sa[1], sa[3]] : sa);
    }

    if (previewState === 'with gap') {
        return surveyAnswers.map(sa => {
            sa.splice(sa.length / 2, 1);
            return sa;
        });
    }

    return surveyAnswers;
}

export async function generateSurveyAnswers(startDate: Date, endDate: Date, resultIdentifiers: string[], minValue: number, maxValue: number, dataCadence: Duration): Promise<SurveyAnswer[][]> {
    const data = Array.from({ length: resultIdentifiers.length }, (): SurveyAnswer[] => []);

    let currentDate = startDate;
    while (currentDate < endDate) {
        for (let i = 0; i < data.length; i++) {
            const answer = await predictableRandomNumber(getDayKey(currentDate) + resultIdentifiers[i]);
            data[i].push({
                date: formatISO(currentDate),
                answers: [(answer % (maxValue - minValue) + minValue).toString()]
            } as SurveyAnswer);
        }
        currentDate = add(currentDate, dataCadence);
    }

    return data;
}