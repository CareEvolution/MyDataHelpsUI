import { DailyDataProvider, DailyDataQueryResult } from '../query-daily-data';
import { SurveyDataType } from '../survey-data-type';
import { InsightMatrixValueCalculator } from './value-calculator';
import { InsightMatrixValueFormatter } from './value-formatter';
import { InsightMatrixValueEvaluator } from './value-evaluator';
import { InsightMatrixValueThreshold } from './value-threshold';

export interface InsightMatrixDataConfiguration {
    label?: string;
    rawDataType: string | SurveyDataType;
}

export interface InsightMatrixGroupByDataConfiguration extends InsightMatrixDataConfiguration {
    thresholds: InsightMatrixValueThreshold[];
}

export interface InsightMatrixComparisonDataConfiguration extends InsightMatrixDataConfiguration {
    units?: string;
    valueCalculator: InsightMatrixValueCalculator;
    valueFormatter: InsightMatrixValueFormatter;
    valueEvaluator: InsightMatrixValueEvaluator;
}

export interface InsightMatrixDataProvider<T extends InsightMatrixDataConfiguration> {
    configuration: T;
    loadData: DailyDataProvider;
}

export interface InsightMatrixData<T extends InsightMatrixDataConfiguration> {
    configuration: T;
    result: DailyDataQueryResult;
}