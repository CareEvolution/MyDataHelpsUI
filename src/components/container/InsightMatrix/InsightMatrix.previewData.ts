import { add, startOfToday } from 'date-fns';
import { DailyDataQueryResult, DailyDataType, generateSampleData, InsightMatrixDataConfiguration, InsightMatrixDataProvider, isSurveyDataType, queryPreviewDailyData } from '../../../helpers';

const endDate = startOfToday();
const startDate = add(endDate, { days: -28 });

const sampleSurveyData: DailyDataQueryResult = generateSampleData(startDate, endDate, 0, 10);

export function createPreviewDataProvider<T extends InsightMatrixDataConfiguration>(configuration: T): InsightMatrixDataProvider<T> {
    if (isSurveyDataType(configuration.rawDataType)) {
        return {
            configuration: configuration,
            loadData: () => Promise.resolve(sampleSurveyData)
        };
    }
    return {
        configuration: configuration,
        loadData: (startDate: Date, endDate: Date) => queryPreviewDailyData(configuration.rawDataType as string, startDate, endDate, 0.5)
    };
}