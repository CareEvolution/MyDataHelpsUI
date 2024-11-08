import { add } from 'date-fns';
import getDayKey from '../get-day-key';
import { InsightMatrixData, InsightMatrixGroupByDataConfiguration } from './types';

export interface InsightMatrixValueThreshold {
    label: string;
    minimumValue?: number;
    maximumValue?: number;
}

export const NotEnteredThreshold = 'Not Entered';

export type InsightMatrixThresholdDaysLookup = { [key: string]: string[] };

export function computeThresholdDays(startDate: Date, endDate: Date, overviewData: InsightMatrixData<InsightMatrixGroupByDataConfiguration>): InsightMatrixThresholdDaysLookup {
    const lookup: InsightMatrixThresholdDaysLookup = {};

    const computeThreshold = (thresholds: InsightMatrixValueThreshold[], value?: number): string | undefined => {
        if (value !== undefined && value >= 0) {
            for (let i = 0; i < thresholds.length; i++) {
                const threshold = thresholds[i];
                if (threshold.minimumValue !== undefined && threshold.minimumValue > value) continue;
                if (threshold.maximumValue !== undefined && threshold.maximumValue < value) continue;
                return threshold.label;
            }
            return undefined;
        }
        return NotEnteredThreshold;
    };

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const currentDayKey = getDayKey(currentDate);
        const threshold = computeThreshold(overviewData.configuration.thresholds, overviewData.result[currentDayKey]);

        if (threshold) {
            if (!lookup.hasOwnProperty(threshold)) {
                lookup[threshold] = [];
            }
            lookup[threshold].push(currentDayKey);
        }

        currentDate = add(currentDate, { days: 1 });
    }

    return lookup;
}

