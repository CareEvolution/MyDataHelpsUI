import { add, Duration, min, startOfToday } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { generateSurveyAnswers } from '../../../helpers/survey-answer';

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