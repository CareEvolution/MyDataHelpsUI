import { add, parseISO } from 'date-fns';
import { formatNumberForLocale, getDailyDataTypeDefinition, getDayKey, isSurveyDataType, language, queryRelativeActivity, RelativeActivityDataType } from '../index';
import queryLatestSurveyAnswersByDate from '../query-latest-survey-answers-by-date';
import { MicroTrendDataType, MicroTrendPreviewState, MicroTrendResults } from './types';
import React, { ReactElement } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { safeEntries } from '../functions';

export function isMicroTrendDataType(dataType: MicroTrendDataType | RelativeActivityDataType & { rawDataType?: undefined }): dataType is MicroTrendDataType {
    return dataType.rawDataType !== undefined;
}

export function convertToMicroTrendDataType(dataType: RelativeActivityDataType): MicroTrendDataType {
    return {
        icon: dataType.icon,
        rawDataType: dataType.dailyDataType,
        label: dataType.label,
        color: dataType.color,
        threshold: dataType.threshold,
        overThresholdColor: dataType.overThresholdColor,
        formatter: dataType.formatter
    };
}

export async function loadMicroTrendResults(dataType: MicroTrendDataType, endDate: Date, lookbackDays: number, previewState?: MicroTrendPreviewState): Promise<MicroTrendResults> {
    if (previewState === 'noData') {
        return {};
    }

    const startDate = add(endDate, { days: -1 * lookbackDays });

    const resultLoader = isSurveyDataType(dataType.rawDataType) ? loadSurveyMicroTrendResults : loadRelativeActivityMicroTrendResults;
    const results = await resultLoader(dataType, startDate, endDate, !!previewState);

    if (previewState === 'noTrend') {
        const dayKey = getDayKey(endDate);
        return { [dayKey]: { value: results[dayKey]!.value } };
    }

    return results;
}

async function loadSurveyMicroTrendResults(dataType: MicroTrendDataType, startDate: Date, endDate: Date, preview: boolean): Promise<MicroTrendResults> {
    if (!isSurveyDataType(dataType.rawDataType)) return {};

    const calculatePrevious30DayAverage = (surveyAnswersByDate: Partial<Record<string, SurveyAnswer[]>>, endDate: Date): number | undefined => {
        const startDate = add(endDate, { days: -31 });
        const stats = safeEntries(surveyAnswersByDate).reduce((stats, [dayKey, surveyAnswers]) => {
            const date = parseISO(dayKey);
            if (date >= startDate && date < endDate) {
                const value = parseInt(surveyAnswers[0].answers[0]);
                if (!Number.isNaN(value)) {
                    stats.count += 1;
                    stats.sum += value;
                }
            }
            return stats;
        }, { sum: 0, count: 0 });
        return stats.count >= 5 ? stats.sum / stats.count : undefined;
    };

    const queryStartDate = dataType.threshold === '30DayAverage' || dataType.threshold === undefined ? add(startDate, { days: -31 }) : startDate;
    const queryEndDate = add(endDate, { days: 1 });
    const { surveyName, stepIdentifier, resultIdentifier, useEventAsDate } = dataType.rawDataType;
    const surveyAnswersByDate = await queryLatestSurveyAnswersByDate(queryStartDate, queryEndDate, surveyName, stepIdentifier, resultIdentifier, useEventAsDate, preview);
    const threshold = dataType.threshold === '30DayAverage' || dataType.threshold === undefined
        ? calculatePrevious30DayAverage(surveyAnswersByDate, endDate)
        : dataType.threshold > 0 ? dataType.threshold : undefined;

    return safeEntries(surveyAnswersByDate).reduce((results, [dayKey, surveyAnswers]) => {
        const value = parseInt(surveyAnswers[0].answers[0]);
        if (!Number.isNaN(value)) {
            const fillPercent = threshold !== undefined ? Math.min(1, value / (threshold * 2)) : undefined;
            results[dayKey] = { value, threshold, fillPercent };
        }
        return results;
    }, {} as MicroTrendResults);
}

async function loadRelativeActivityMicroTrendResults(dataType: MicroTrendDataType, startDate: Date, endDate: Date, preview: boolean): Promise<MicroTrendResults> {
    if (isSurveyDataType(dataType.rawDataType)) return {};

    const relativeActivityDataType: RelativeActivityDataType = { dailyDataType: dataType.rawDataType, threshold: dataType.threshold };
    const allResults = await queryRelativeActivity(startDate, endDate, [relativeActivityDataType], preview);
    const relativeActivityResults = Object.values(allResults)[0];
    return Object.entries(relativeActivityResults).reduce((results, [dayKey, relativeActivityResult]) => {
        results[dayKey] = {
            value: relativeActivityResult.value,
            threshold: relativeActivityResult.threshold,
            fillPercent: relativeActivityResult.relativePercent
        };
        return results;
    }, {} as MicroTrendResults);
}

export function getIcon(dataType: MicroTrendDataType): ReactElement {
    if (dataType.icon) {
        return dataType.icon;
    }
    if (isSurveyDataType(dataType.rawDataType)) {
        return <FontAwesomeSvgIcon icon={faList} />;
    }
    return getDailyDataTypeDefinition(dataType.rawDataType).icon;
}

export function getLabel(dataType: MicroTrendDataType): string {
    if (dataType.label) {
        return dataType.label;
    }
    if (isSurveyDataType(dataType.rawDataType)) {
        const { surveyName, stepIdentifier, resultIdentifier } = dataType.rawDataType;
        return resultIdentifier || stepIdentifier || surveyName || 'Survey';
    }
    const dataTypeDefinition = getDailyDataTypeDefinition(dataType.rawDataType);
    return dataTypeDefinition.labelKey ? language(dataTypeDefinition.labelKey) : dataType.rawDataType;
}

export function getFormatter(dataType: MicroTrendDataType): (value: number) => string {
    if (dataType.formatter) {
        return dataType.formatter;
    }
    if (isSurveyDataType(dataType.rawDataType)) {
        return (value: number) => formatNumberForLocale(value);
    }
    return getDailyDataTypeDefinition(dataType.rawDataType).formatter;
}

export function getDataTypeKey(dataType: MicroTrendDataType): string {
    if (isSurveyDataType(dataType.rawDataType)) {
        const { surveyName, stepIdentifier, resultIdentifier, useEventAsDate } = dataType.rawDataType;
        return `${surveyName}-${stepIdentifier}-${resultIdentifier}-${useEventAsDate}`;
    }
    return dataType.rawDataType;
}