import { DailyDataType } from '../daily-data-types';
import { averageValueOverviewValueCalculator, OverviewValueCalculator, percentageOfDaysOverviewValueCalculator } from './value-calculator';
import { createIntegerOverviewValueFormatter, minutesToHoursOverviewValueFormatter, OverviewValueFormatter, shrinkThousandsOverviewValueFormatter } from './value-formatter';
import { createOverviewValueEvaluator, OverviewValueEvaluator } from './value-evaluator';
import { SurveyDataType } from './survey-data-type';
import { OverviewThreshold } from './thresholds';

export type OverviewDataTypeName = 'mood' | 'sleep' | 'steps' | 'mindful' | 'therapy';

export interface OverviewDataTypeLabel {
    primary: string;
    secondary?: string;
}

export interface OverviewDataType {
    name: OverviewDataTypeName;
    label: OverviewDataTypeLabel;
    units?: string;
    rawDataType: DailyDataType | SurveyDataType;
    thresholds: OverviewThreshold[];
    secondaryValueCalculator: OverviewValueCalculator;
    secondaryValueFormatter: OverviewValueFormatter;
    secondaryValueEvaluator: OverviewValueEvaluator;
}

export interface OverviewDataTypeOptions {
    label?: OverviewDataTypeLabel;
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
        label: { primary: 'When mood rating was...', secondary: 'Mood Rating' },
        thresholds: [
            { label: 'High', min: 8 },
            { label: 'Medium', min: 6 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 8
    }, options);

    return {
        name: 'mood',
        label: mergedOptions.label!,
        units: 'avg rating',
        rawDataType: surveyDataType,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter(),
        secondaryValueEvaluator: createOverviewValueEvaluator(mergedOptions.minimumGoodValue!, mergedOptions.maximumGoodValue),
    };
}

export function createSleepOverviewDataType(options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: { primary: 'When sleep was...', secondary: 'Sleep' },
        thresholds: [
            { label: 'High', min: 420 },
            { label: 'Medium', min: 360 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 420,
        maximumGoodValue: 600
    }, options);

    return {
        name: 'sleep',
        label: mergedOptions.label!,
        units: 'avg per night',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: minutesToHoursOverviewValueFormatter,
        secondaryValueEvaluator: createOverviewValueEvaluator(mergedOptions.minimumGoodValue!, mergedOptions.maximumGoodValue),
    };
}

export function createStepsOverviewDataType(options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: { primary: 'When steps were...', secondary: 'Steps' },
        thresholds: [
            { label: 'High', min: 6000 },
            { label: 'Medium', min: 4000 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 6000
    }, options);

    return {
        name: 'steps',
        label: mergedOptions.label!,
        units: 'avg per day',
        rawDataType: DailyDataType.Steps,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: shrinkThousandsOverviewValueFormatter,
        secondaryValueEvaluator: createOverviewValueEvaluator(mergedOptions.minimumGoodValue!, mergedOptions.maximumGoodValue)
    };
}

export function createMindfulOverviewDataType(options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: { primary: 'When mindful activity was...', secondary: 'Mindful Activity' },
        thresholds: [
            { label: 'High', min: 60 },
            { label: 'Medium', min: 30 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 0
    }, options);

    return {
        name: 'mindful',
        label: mergedOptions.label!,
        units: '% of days',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: percentageOfDaysOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter('%'),
        secondaryValueEvaluator: createOverviewValueEvaluator(mergedOptions.minimumGoodValue!, mergedOptions.maximumGoodValue)
    };
}

export function createTherapyOverviewDataType(options?: OverviewDataTypeOptions): OverviewDataType {
    const mergedOptions = mergeOptions({
        label: { primary: 'When therapeutic activity was...', secondary: 'Therapeutic Activity' },
        thresholds: [
            { label: 'High', min: 60 },
            { label: 'Medium', min: 30 },
            { label: 'Low', min: 0 }
        ],
        minimumGoodValue: 0
    }, options);

    return {
        name: 'therapy',
        label: mergedOptions.label!,
        units: '% of days',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: mergedOptions.thresholds!,
        secondaryValueCalculator: percentageOfDaysOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter('%'),
        secondaryValueEvaluator: createOverviewValueEvaluator(mergedOptions.minimumGoodValue!, mergedOptions.maximumGoodValue)
    };
}