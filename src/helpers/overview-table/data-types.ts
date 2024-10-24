import { DailyDataType } from '../daily-data-types';
import { OverviewValueCalculator } from './value-calculator';
import { OverviewValueFormatter } from './value-formatter';
import { OverviewValueEvaluator } from './value-evaluator';
import { SurveyDataType } from './survey-data-type';
import { OverviewValueThreshold } from './value-threshold';

export interface OverviewDataType {
    label?: string;
    rawDataType: DailyDataType | SurveyDataType;
}

export interface PrimaryOverviewDataType extends OverviewDataType {
    thresholds: OverviewValueThreshold[];
}

export interface SecondaryOverviewDataType extends OverviewDataType {
    units?: string;
    valueCalculator: OverviewValueCalculator;
    valueFormatter: OverviewValueFormatter;
    valueEvaluator: OverviewValueEvaluator;
}