import { add, startOfToday } from 'date-fns';
import { DailyDataQueryResult, DailyDataType, generateSampleData, isSurveyDataType, OverviewDataProvider, OverviewDataType, queryPreviewDailyData } from '../../../helpers';

const endDate = startOfToday();
const startDate = add(endDate, { days: -28 });

const sampleSurveyData: DailyDataQueryResult = generateSampleData(startDate, endDate, 0, 10);

export function createPreviewDataProvider<T extends OverviewDataType>(dataType: T): OverviewDataProvider<T> {
    if (isSurveyDataType(dataType.rawDataType)) {
        return {
            type: dataType,
            dataProvider: () => Promise.resolve(sampleSurveyData)
        };
    }
    return {
        type: dataType,
        dataProvider: (startDate: Date, endDate: Date) => queryPreviewDailyData(dataType.rawDataType as DailyDataType, startDate, endDate)
    };
}