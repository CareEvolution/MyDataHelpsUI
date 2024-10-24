import { add } from 'date-fns';
import getDayKey from '../get-day-key';
import { OverviewData } from './data-provider';

export interface OverviewThreshold {
    label: string;
    min?: number;
    max?: number;
}

export type OverviewThresholdDaysLookup = { [key: string]: string[] };

export const NotEnteredThreshold = 'Not Entered';

export function computeThresholdDays(startDate: Date, endDate: Date, overviewData: OverviewData): OverviewThresholdDaysLookup {
    const lookup: OverviewThresholdDaysLookup = {};

    const computeThreshold = (thresholds: OverviewThreshold[], value?: number): string => {
        if (value !== undefined && value >= 0) {
            for (let i = 0; i < thresholds.length; i++) {
                const threshold = thresholds[i];
                if (threshold.min !== undefined && threshold.min > value) continue;
                if (threshold.max !== undefined && threshold.max < value) continue;
                return threshold.label;
            }
        }
        return NotEnteredThreshold;
    };

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const currentDayKey = getDayKey(currentDate);
        const threshold = computeThreshold(overviewData.type.thresholds, overviewData.queryResult[currentDayKey]);
        if (!lookup.hasOwnProperty(threshold)) {
            lookup[threshold] = [];
        }
        lookup[threshold].push(currentDayKey);
        currentDate = add(currentDate, { days: 1 });
    }

    return lookup;
}

