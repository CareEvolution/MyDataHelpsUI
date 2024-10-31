import { add, startOfToday } from 'date-fns';
import { DailyDataQueryResult, generateSampleData, OverviewDataProvider, OverviewDataType, OverviewDataTypeName } from '../../../helpers';

const endDate = startOfToday();
const startDate = add(endDate, { days: -28 });

const sampleData: Record<OverviewDataTypeName, DailyDataQueryResult> = {
    'mood': generateSampleData(startDate, endDate, 0, 10),
    'sleep': generateSampleData(startDate, endDate, 200, 675),
    'steps': generateSampleData(startDate, endDate, 1000, 11500),
    'mindful': generateSampleData(startDate, endDate, 0, 120),
    'therapy': generateSampleData(startDate, endDate, 0, 120)
};

export function createPreviewDataProvider(type: OverviewDataType): OverviewDataProvider {
    return { type: type, dataProvider: () => Promise.resolve(sampleData[type.name]) };
}