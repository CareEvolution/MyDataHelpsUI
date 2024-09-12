import { SparkRangeChartRange } from '../../presentational';
import { getDayKey } from '../../../helpers';
import { add } from "date-fns";
import { predictableRandomNumber } from "../../../helpers/predictableRandomNumber";

export type GlucoseDayCoordinatorPreviewState = 'no data' | 'some data' | 'all data';

export interface GlucoseDayCoordinatorPreviewData {
    ranges: { [key: string]: SparkRangeChartRange };
    recentAverage?: number;
}

export const previewData = async (previewState: GlucoseDayCoordinatorPreviewState, startDate: Date, endDate: Date): Promise<GlucoseDayCoordinatorPreviewData> => {
    if (previewState === 'no data') {
        return { ranges: {} };
    }
    if (previewState === 'some data') {
        return await generatePreviewData(startDate, endDate, true);
    }
    if (previewState === 'all data') {
        return await generatePreviewData(startDate, endDate);
    }
    return {} as GlucoseDayCoordinatorPreviewData;
};

async function generatePreviewData(startDate: Date, endDate: Date, skipSome: boolean = false) {
    const ranges: { [key: string]: SparkRangeChartRange } = {};

    let currentDate = startDate;
    while (currentDate <= endDate) {
        if (!skipSome || await predictableRandomNumber(getDayKey(currentDate)) % 5 > 1) {
            let min = await predictableRandomNumber(getDayKey(currentDate) + ' min') % 120;
            let max = await predictableRandomNumber(getDayKey(currentDate) + ' max') % 120 + 120;
            ranges[getDayKey(currentDate)] = {
                min: min,
                max: max,
                average: await predictableRandomNumber(getDayKey(currentDate) + ' avg') % (max - min) + min
            };
        }
        currentDate = add(currentDate, { days: 1 });
    }

    return { ranges: ranges, recentAverage: await predictableRandomNumber(getDayKey(currentDate) + ' recent avg') % 240 }
}