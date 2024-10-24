import { DailyDataType } from '../daily-data-types';
import { averageValueOverviewValueCalculator, OverviewValueCalculator, percentageOfDaysOverviewValueCalculator } from './value-calculator';
import { createIntegerOverviewValueFormatter, minutesToHoursOverviewValueFormatter, OverviewValueFormatter, shrinkThousandsOverviewValueFormatter } from './value-formatter';
import { createOverviewValueEvaluator, OverviewValueEvaluator } from './value-evaluator';
import { SurveyDataType } from './survey-data-type';
import { OverviewThreshold } from './thresholds';

export interface OverviewDataTypeLabel {
    primary: string;
    secondary?: string;
}

export interface OverviewDataType {
    label: OverviewDataTypeLabel;
    units?: string;
    rawDataType: DailyDataType | SurveyDataType;
    thresholds: OverviewThreshold[];
    secondaryValueCalculator: OverviewValueCalculator;
    secondaryValueFormatter: OverviewValueFormatter;
    secondaryValueEvaluator: OverviewValueEvaluator;
}

export function createMoodRatingDataType(surveyName: string, stepIdentifier: string, resultIdentifier: string, label?: OverviewDataTypeLabel, minGood?: number, maxGood?: number): OverviewDataType {
    return {
        label: label ?? { primary: 'When mood rating was...', secondary: 'Mood Rating' },
        units: 'avg rating',
        rawDataType: { surveyName, stepIdentifier, resultIdentifier },
        thresholds: [
            { label: 'High', min: 8 },
            { label: 'Medium', min: 6 },
            { label: 'Low', min: 0 }
        ],
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter(),
        secondaryValueEvaluator: createOverviewValueEvaluator(minGood ?? 8, maxGood),
    };
}

export function createStepsOverviewDataType(label?: OverviewDataTypeLabel, minGood?: number, maxGood?: number): OverviewDataType {
    return {
        label: label ?? { primary: 'When steps were...', secondary: 'Steps' },
        units: 'avg per day',
        rawDataType: DailyDataType.Steps,
        thresholds: [
            { label: 'High', min: 6000 },
            { label: 'Medium', min: 4000 },
            { label: 'Low', min: 0 }
        ],
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: shrinkThousandsOverviewValueFormatter,
        secondaryValueEvaluator: createOverviewValueEvaluator(minGood ?? 6000, maxGood)
    };
}

export function createSleepOverviewDataType(label?: OverviewDataTypeLabel, minGood?: number, maxGood?: number): OverviewDataType {
    return {
        label: label ?? { primary: 'When sleep was...', secondary: 'Sleep' },
        units: 'avg per night',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: [
            { label: 'High', min: 420 },
            { label: 'Medium', min: 360 },
            { label: 'Low', min: 0 }
        ],
        secondaryValueCalculator: averageValueOverviewValueCalculator,
        secondaryValueFormatter: minutesToHoursOverviewValueFormatter,
        secondaryValueEvaluator: createOverviewValueEvaluator(minGood ?? 420, maxGood ?? 600)
    };
}

export function createMindfulOverviewDataType(label?: OverviewDataTypeLabel, minGood?: number, maxGood?: number): OverviewDataType {
    return {
        label: label ?? { primary: 'When mindful activity was...', secondary: 'Mindful Activity' },
        units: '% of days',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: [
            { label: 'High', min: 60 },
            { label: 'Medium', min: 30 },
            { label: 'Low', min: 0 }
        ],
        secondaryValueCalculator: percentageOfDaysOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter('%'),
        secondaryValueEvaluator: createOverviewValueEvaluator(minGood ?? 0, maxGood)
    };
}

export function createTherapyOverviewDataType(label?: OverviewDataTypeLabel, minGood?: number, maxGood?: number): OverviewDataType {
    return {
        label: label ?? { primary: 'When therapeutic activity was...', secondary: 'Therapeutic Activity' },
        units: '% of days',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: [
            { label: 'High', min: 60 },
            { label: 'Medium', min: 30 },
            { label: 'Low', min: 0 }
        ],
        secondaryValueCalculator: percentageOfDaysOverviewValueCalculator,
        secondaryValueFormatter: createIntegerOverviewValueFormatter('%'),
        secondaryValueEvaluator: createOverviewValueEvaluator(minGood ?? 0, maxGood)
    };
}