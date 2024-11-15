import { generateGlucose, getDayKey, predictableRandomNumber, Reading } from '../../../helpers';
import { add, isSameDay } from 'date-fns';

export type GlucoseDayCoordinatorPreviewState = 'no data' | 'some data' | 'all data';

export const previewData = async (previewState: GlucoseDayCoordinatorPreviewState, startDate: Date, endDate: Date): Promise<Reading[]> => {
    if (previewState === 'no data') {
        return [];
    }
    if (previewState === 'some data') {
        let readings = await generateGlucose(startDate, endDate);

        let currentDate = startDate;
        while (currentDate <= endDate) {
            if (await predictableRandomNumber(getDayKey(currentDate)) % 5 === 0) {
                readings = readings.filter(reading => !isSameDay(currentDate, reading.timestamp));
            }
            currentDate = add(currentDate, { days: 1 });
        }

        return readings;
    }
    if (previewState === 'all data') {
        return generateGlucose(startDate, endDate);
    }
    return [];
};