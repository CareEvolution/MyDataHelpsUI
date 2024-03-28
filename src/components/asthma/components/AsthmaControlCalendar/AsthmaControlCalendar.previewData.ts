import { AsthmaLogEntry, AsthmaSymptomLevel } from '../../model';
import { dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { add } from 'date-fns';

export type AsthmaControlCalendarPreviewState = 'no logs' | 'some logs';

export interface AsthmaControlCalendarPreviewData {
    logEntries: AsthmaLogEntry[];
}

const createLogEntry = (daysAgo: number, symptomLevel: AsthmaSymptomLevel): AsthmaLogEntry => {
    return {
        identifier: dateToAsthmaLogEntryIdentifier(add(new Date(), {days: -daysAgo})),
        symptomLevel: symptomLevel,
        symptoms: [],
        impacts: [],
        triggers: []
    }
};

export const previewData: Record<AsthmaControlCalendarPreviewState, AsthmaControlCalendarPreviewData> = {
    'no logs': {
        logEntries: []
    },
    'some logs': {
        logEntries: [
            createLogEntry(20, 'none'),
            {...createLogEntry(19, 'mild'), impacts: ['Limit your daily activity']},
            createLogEntry(17, 'none'),
            createLogEntry(16, 'none'),
            createLogEntry(15, 'none'),
            createLogEntry(8, 'mild'),
            createLogEntry(8, 'none'),
            createLogEntry(7, 'none'),
            createLogEntry(6, 'none'),
            createLogEntry(5, 'none'),
            createLogEntry(4, 'none'),
            createLogEntry(3, 'none'),
            createLogEntry(2, 'mild'),
            {...createLogEntry(1, 'mild'), symptoms: ['Difficulty breathing'], impacts: ['Limit your daily activity'], triggers: ['Smoke (tobacco or wood burning)']},
            {...createLogEntry(0, 'mild'), impacts: ['Limit your daily activity']}
        ]
    }
};
