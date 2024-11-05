import { DailyDataType } from '../daily-data-types';
import { averageValueOverviewValueCalculator, OverviewValueCalculator, percentageOfDaysOverviewValueCalculator } from './value-calculator';
import { createIntegerOverviewValueFormatter, minutesToHoursOverviewValueFormatter, OverviewValueFormatter, shrinkThousandsOverviewValueFormatter } from './value-formatter';
import { isSurveyDataType, SurveyDataType } from './survey-data-type';
import { OverviewThreshold } from './thresholds';
import { getDailyDataTypeDefinition } from '../query-daily-data';
import language from '../language';

export interface OverviewDataType {
    label?: string;
    units?: string;
    rawDataType: DailyDataType | SurveyDataType;
    thresholds: OverviewThreshold[];
    secondaryValueCalculator: OverviewValueCalculator;
    secondaryValueFormatter: OverviewValueFormatter;
    minimumGoodValue: number;
    maximumGoodValue?: number;
}

export function getDefaultOverviewDataTypeLabel(dataType: OverviewDataType): string {
    if (isSurveyDataType(dataType.rawDataType)) {
        return dataType.rawDataType.stepIdentifier;
    }

    const labelKey = getDailyDataTypeDefinition(dataType.rawDataType).labelKey;
    return labelKey ? language(labelKey, "en") : dataType.rawDataType;
}

export interface OverviewDataTypeOptions {
    label?: string;
    thresholds?: OverviewThreshold[];
    minimumGoodValue?: number;
    maximumGoodValue?: number;
}

function mergeOptions(defaultOptions: OverviewDataTypeOptions, options?: OverviewDataTypeOptions): OverviewDataTypeOptions {
    const validOptions: OverviewDataTypeOptions = { ...(options ?? {}) };
    for (const key in validOptions) {
        if (!validOptions[key as keyof OverviewDataTypeOptions]) {
            delete validOptions[key as keyof OverviewDataTypeOptions];
        }
    }
    return { ...defaultOptions, ...validOptions };
}

export function createMoodRatingDataType(surveyDataType: SurveyDataType, options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: 'Mood Rating',
        thresholds: [
            { label: 'High', min: 8 },
            { label: 'Medium', min: 6 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 8
    }, options);

    return {
        label: mergedOptions.label!,
        units: 'avg rating',
        rawDataType: surveyDataType,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter(),
        minimumGoodValue: mergedOptions.minimumGoodValue!,
        maximumGoodValue: mergedOptions.maximumGoodValue
    };
}

export function createSleepOverviewDataType(options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: 'Sleep',
        thresholds: [
            { label: 'High', min: 420 },
            { label: 'Medium', min: 360 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 420,
        maximumGoodValue: 600
    }, options);

    return {
        label: mergedOptions.label!,
        units: 'avg per night',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: minutesToHoursOverviewValueFormatter,
        minimumGoodValue: mergedOptions.minimumGoodValue!,
        maximumGoodValue: mergedOptions.maximumGoodValue
    };
}

export function createStepsOverviewDataType(options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: 'Steps',
        thresholds: [
            { label: 'High', min: 6000 },
            { label: 'Medium', min: 4000 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 6000
    }, options);

    return {
        label: mergedOptions.label!,
        units: 'avg per day',
        rawDataType: DailyDataType.Steps,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: shrinkThousandsOverviewValueFormatter,
        minimumGoodValue: mergedOptions.minimumGoodValue!,
        maximumGoodValue: mergedOptions.maximumGoodValue
    };
}

export function createMindfulOverviewDataType(options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: 'Mindful Activity',
        thresholds: [
            { label: 'High', min: 60 },
            { label: 'Medium', min: 30 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 0
    }, options);

    return {
        label: mergedOptions.label!,
        units: '% of days',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: percentageOfDaysOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter('%'),
        minimumGoodValue: mergedOptions.minimumGoodValue!,
        maximumGoodValue: mergedOptions.maximumGoodValue
    };
}

export function createTherapyOverviewDataType(options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: 'Therapeutic Activity',
        thresholds: [
            { label: 'High', min: 60 },
            { label: 'Medium', min: 30 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 0
    }, options);

    return {
        label: mergedOptions.label!,
        units: '% of days',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: percentageOfDaysOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter('%'),
        minimumGoodValue: mergedOptions.minimumGoodValue!,
        maximumGoodValue: mergedOptions.maximumGoodValue
    };
}