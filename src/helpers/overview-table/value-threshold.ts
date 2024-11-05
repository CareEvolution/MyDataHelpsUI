import { add } from 'date-fns';
import getDayKey from '../get-day-key';
import { OverviewData } from './data-provider';
import { PrimaryOverviewDataType } from './data-types';

export interface OverviewValueThreshold {
    label: string;
    minimumValue?: number;
    maximumValue?: number;
}

export type OverviewThresholdDaysLookup = { [key: string]: string[] };

export const NotEnteredThreshold = 'Not Entered';

export function computeThresholdDays(startDate: Date, endDate: Date, overviewData: OverviewData<PrimaryOverviewDataType>): OverviewThresholdDaysLookup {
    const lookup: OverviewThresholdDaysLookup = {};

    const computeThreshold = (thresholds: OverviewValueThreshold[], value?: number): string => {
        if (value !== undefined && value >= 0) {
            for (let i = 0; i < thresholds.length; i++) {
                const threshold = thresholds[i];
                if (threshold.minimumValue !== undefined && threshold.minimumValue > value) continue;
                if (threshold.maximumValue !== undefined && threshold.maximumValue < value) continue;
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

