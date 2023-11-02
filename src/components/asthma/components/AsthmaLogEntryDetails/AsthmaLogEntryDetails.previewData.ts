import { AsthmaLogEntry } from '../../model';
import { dateToAsthmaLogEntryIdentifier } from '../../helpers';

export type AsthmaLogEntryDetailsPreviewState = 'not-logged' | 'logged-no-symptoms' | 'logged-mild-symptoms' | 'logged-moderate-symptoms' | 'logged-severe-symptoms';

export interface AsthmaLogEntryDetailsPreviewData {
    logEntry?: AsthmaLogEntry;
}

const logEntry: AsthmaLogEntry = {
    identifier: dateToAsthmaLogEntryIdentifier(new Date()),
    symptomLevel: 'none',
    symptoms: [],
    impacts: [],
    triggers: []
};

export const previewData: Record<AsthmaLogEntryDetailsPreviewState, AsthmaLogEntryDetailsPreviewData> = {
    'not-logged': {},
    'logged-no-symptoms': {
        logEntry: logEntry
    },
    'logged-mild-symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'mild',
            symptoms: ['Coughing'],
            impacts: ['Waking up at night', 'Rescue inhaler use'],
            triggers: ['Cold/flu/virus', 'Seasonal allergies/pollen', 'Smoke (tobacco or wood burning)', 'Air pollution', 'Dust mites', 'Mold']
        }
    },
    'logged-moderate-symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'moderate',
            symptoms: ['Coughing'],
            triggers: ['Cold/flu/virus', 'Mold']
        }
    },
    'logged-severe-symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'severe',
            symptoms: ['Coughing', 'Wheezing'],
            impacts: ['Rescue inhaler use']
        }
    }
};
