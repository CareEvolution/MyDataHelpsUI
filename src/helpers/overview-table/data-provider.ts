import { DailyDataProvider, DailyDataQueryResult } from '../query-daily-data';
import { OverviewDataType } from './data-types';

export interface OverviewDataProvider<T extends OverviewDataType> {
    type: T;
    dataProvider: DailyDataProvider;
}

export interface OverviewData<T extends OverviewDataType> {
    type: T;
    queryResult: DailyDataQueryResult;
}