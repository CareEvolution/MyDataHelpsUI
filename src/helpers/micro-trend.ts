import { isSurveyDataType, SurveyDataType } from './insight-matrix';
import { ColorDefinition } from './colors';
import { ReactElement } from 'react';
import { add, parseISO } from 'date-fns';
import { queryRelativeActivity, RelativeActivityDataType } from './relative-activity';
import queryLatestSurveyAnswersByDate from './query-latest-survey-answers-by-date';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { generateSurveyAnswers } from '../components/container/SurveyAnswerChart/SurveyAnswerChart.previewdata';
import { getDayKey } from './index';

export interface MicroTrendSurveyDataType extends SurveyDataType {
    minValue: number;
    maxValue: number;
}

export interface MicroTrendDataType {
    icon?: ReactElement;
    rawDataType: string | MicroTrendSurveyDataType;
    label?: string;
    color?: ColorDefinition;
    threshold?: number | '30DayAverage';
    overThresholdColor?: ColorDefinition;
    formatter?: (number: number) => string;
}

export interface MicroTrendResult {
    value: number;
    threshold?: number;
    fillPercent?: number;
}

export type MicroTrendResults = Record<string, MicroTrendResult>;

export function isMicroTrendDataType<T>(dataType: T & { rawDataType?: undefined } | MicroTrendDataType): dataType is MicroTrendDataType {
    return dataType.rawDataType !== undefined;
}

export async function loadMicroTrendData(dataType: MicroTrendDataType, endDate: Date, lookbackDays: number, preview: boolean): Promise<MicroTrendResults> {
    const startDate = add(endDate, { days: -1 * lookbackDays });
    if (hasSurveyDataType(dataType)) {
        return loadSurveyData(dataType, startDate, endDate, preview);
    } else if (hasRelativeActivityDataType(dataType)) {
        return loadRelativeActivityData(dataType, startDate, endDate, preview);
    }
    return {};
}

async function loadSurveyData(dataType: MicroTrendDataType & { rawDataType: MicroTrendSurveyDataType }, startDate: Date, endDate: Date, preview: boolean): Promise<MicroTrendResults> {
    const { surveyName, stepIdentifier, resultIdentifier, useEventAsDate } = dataType.rawDataType;

    const queryStartDate = dataType.threshold === '30DayAverage' || dataType.threshold === undefined
        ? add(startDate, { days: -31 })
        : startDate;
    const queryEndDate = add(endDate, { days: 1 });

    const surveyAnswersByDate = preview
        ? await generateLatestSurveyAnswersByDate(dataType, queryStartDate, queryEndDate)
        : await queryLatestSurveyAnswersByDate(queryStartDate, queryEndDate, surveyName, stepIdentifier, resultIdentifier, useEventAsDate);

    const threshold = dataType.threshold === '30DayAverage' || dataType.threshold === undefined
        ? calculatePrevious30DayAverage(surveyAnswersByDate, endDate)
        : dataType.threshold;

    return Object.entries(surveyAnswersByDate as Record<string, SurveyAnswer[]>).reduce((results, [dayKey, surveyAnswers]) => {
        const value = Number(surveyAnswers[0].answers[0]);
        const fillPercent = threshold !== undefined ? Math.min(value / (threshold * 2)) : undefined;
        results[dayKey] = { value, threshold, fillPercent };
        return results;
    }, {} as MicroTrendResults);
}

async function generateLatestSurveyAnswersByDate(dataType: MicroTrendDataType & { rawDataType: MicroTrendSurveyDataType }, startDate: Date, endDate: Date): Promise<Partial<Record<string, SurveyAnswer[]>>> {
    const { resultIdentifier, minValue, maxValue } = dataType.rawDataType;
    return generateSurveyAnswers(startDate, endDate, [resultIdentifier ?? 'result'], minValue, maxValue, { days: 1 }).then(surveyAnswers => {
        return surveyAnswers[0].reduce((surveyAnswersByDate, surveyAnswer) => {
            surveyAnswersByDate[getDayKey(surveyAnswer.date)] = [surveyAnswer];
            return surveyAnswersByDate;
        }, {} as Partial<Record<string, SurveyAnswer[]>>);
    });
}

function calculatePrevious30DayAverage(surveyAnswersByDate: Partial<Record<string, SurveyAnswer[]>>, endDate: Date): number | undefined {
    const startDate = add(endDate, { days: -31 });
    const stats = Object.entries(surveyAnswersByDate as Record<string, SurveyAnswer[]>).reduce((stats, [dayKey, surveyAnswers]) => {
        const date = parseISO(dayKey);
        if (date >= startDate && date < endDate) {
            stats.count += 1;
            stats.sum += Number(surveyAnswers[0].answers[0]);
        }
        return stats;
    }, { sum: 0, count: 0 });
    return stats.count >= 5 ? stats.sum / stats.count : undefined;
}

async function loadRelativeActivityData(dataType: MicroTrendDataType & { rawDataType: string }, startDate: Date, endDate: Date, preview: boolean): Promise<MicroTrendResults> {
    const relativeActivityDataType: RelativeActivityDataType = {
        dailyDataType: dataType.rawDataType,
        threshold: dataType.threshold
    };
    const allResults = await queryRelativeActivity(startDate, endDate, [relativeActivityDataType], preview);
    const relativeActivityResults = Object.values(allResults)[0];
    return Object.entries(relativeActivityResults).reduce((results, [dayKey, result]) => {
        results[dayKey] = {
            value: result.value,
            threshold: result.threshold,
            fillPercent: result.relativePercent
        };
        return results;
    }, {} as MicroTrendResults);
}

function hasSurveyDataType(dataType: MicroTrendDataType): dataType is MicroTrendDataType & { rawDataType: MicroTrendSurveyDataType } {
    return isSurveyDataType(dataType.rawDataType);
}

function hasRelativeActivityDataType(dataType: MicroTrendDataType): dataType is MicroTrendDataType & { rawDataType: string } {
    return !isSurveyDataType(dataType.rawDataType);
}