import { DailyDataType } from '../daily-data-types';
import { DailyDataProvider, DailyDataQueryResult } from '../query-daily-data';

export interface OverviewValueCalculator {
    calculate: (days: number, values: number[]) => number;
}

export interface OverviewValueFormatter {
    format: (value: number) => string;
}

export interface OverviewValueEvaluator {
    isGood: (value: number) => boolean;
}

export interface OverviewDataType {
    label: string;
    dailyDataType: DailyDataType;
    valueCalculator: OverviewValueCalculator;
    valueFormatter: OverviewValueFormatter;
    valueEvaluator: OverviewValueEvaluator;
}

export interface OverviewDataProvider {
    type: OverviewDataType;
    dataProvider: DailyDataProvider;
}

export interface OverviewData {
    type: OverviewDataType;
    data: DailyDataQueryResult;
}