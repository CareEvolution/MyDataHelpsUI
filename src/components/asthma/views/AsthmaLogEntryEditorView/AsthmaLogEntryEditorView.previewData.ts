import { AsthmaLogEntry } from '../../model';
import { dateToAsthmaLogEntryIdentifier } from '../../helpers';

export type AsthmaLogEntryEditorViewPreviewState = 'no symptoms' | 'mild symptoms' | 'moderate symptoms' | 'severe symptoms';

export interface AsthmaLogEntryEditorViewPreviewData {
    logEntry?: AsthmaLogEntry;
}

const logEntry: AsthmaLogEntry = {
    identifier: dateToAsthmaLogEntryIdentifier(new Date()),
    symptomLevel: 'none',
    symptoms: [],
    impacts: [],
    triggers: []
};

export const previewData: Record<AsthmaLogEntryEditorViewPreviewState, AsthmaLogEntryEditorViewPreviewData> = {
    'no symptoms': {
        logEntry: logEntry
    },
    'mild symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'mild',
            symptoms: ['Coughing'],
            impacts: ['Wake up at night', 'Use your rescue inhaler'],
            triggers: ['Cold/viral illness', 'Seasonal allergens/pollen', 'Smoke (tobacco or wood burning)', 'Air pollution', 'Dust mites', 'Mold']
        }
    },
    'moderate symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'moderate',
            symptoms: ['Coughing'],
            triggers: ['Cold/viral illness', 'Mold']
        }
    },
    'severe symptoms': {
        logEntry: {
            ...logEntry,
            symptomLevel: 'severe',
            symptoms: ['Coughing', 'Wheezing'],
            impacts: ['Use your rescue inhaler']
        }
    }
};
