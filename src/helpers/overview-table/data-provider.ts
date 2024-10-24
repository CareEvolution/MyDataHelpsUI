import { DailyDataProvider, DailyDataQueryResult } from '../query-daily-data';
import { OverviewDataType } from './data-types';

export interface OverviewDataProvider {
    type: OverviewDataType;
    dataProvider: DailyDataProvider;
}

export interface OverviewData {
    type: OverviewDataType;
    queryResult: DailyDataQueryResult;
}