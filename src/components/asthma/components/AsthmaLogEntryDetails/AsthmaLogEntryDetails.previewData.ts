import { AsthmaLogEntry } from '../../model';
import { dateToAsthmaLogEntryIdentifier } from '../../helpers';

export type AsthmaLogEntryDetailsPreviewState = 'not logged' | 'logged with no symptoms' | 'logged with mild symptoms' | 'logged with moderate symptoms' | 'logged with severe symptoms';

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
    'not logged': {},
    'logged with no symptoms': {
        logEntry: logEntry
    },
    'logged with mild symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'mild',
            symptoms: ['Coughing'],
            impacts: ['Waking up at night', 'Rescue inhaler use'],
            triggers: ['Cold/flu/virus', 'Seasonal allergies/pollen', 'Smoke', 'Air pollution', 'Dust mites', 'Mold']
        }
    },
    'logged with moderate symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'moderate',
            symptoms: ['Coughing'],
            triggers: ['Cold/flu/virus', 'Mold']
        }
    },
    'logged with severe symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'severe',
            symptoms: ['Coughing', 'Wheezing'],
            impacts: ['Rescue inhaler use']
        }
    }
};
