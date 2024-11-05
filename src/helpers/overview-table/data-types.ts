import { DailyDataType } from '../daily-data-types';
import { OverviewValueCalculator } from './value-calculator';
import { OverviewValueFormatter } from './value-formatter';
import { OverviewValueEvaluator } from './value-evaluator';
import { isSurveyDataType, SurveyDataType } from './survey-data-type';
import { OverviewThreshold } from './thresholds';
import { getDailyDataTypeDefinition } from '../query-daily-data';
import language from '../language';

export interface OverviewDataType {
    label?: string;
    rawDataType: DailyDataType | SurveyDataType;
}

export interface PrimaryOverviewDataType extends OverviewDataType {
    thresholds: OverviewThreshold[];
}

export interface SecondaryOverviewDataType extends OverviewDataType {
    units?: string;
    secondaryValueCalculator: OverviewValueCalculator;
    secondaryValueFormatter: OverviewValueFormatter;
    secondaryValueEvaluator: OverviewValueEvaluator;
}

export function getDefaultOverviewDataTypeLabel(dataType: OverviewDataType): string {
    if (isSurveyDataType(dataType.rawDataType)) {
        return dataType.rawDataType.stepIdentifier;
    }

    const labelKey = getDailyDataTypeDefinition(dataType.rawDataType).labelKey;
    return labelKey ? language(labelKey, "en") : dataType.rawDataType;
}