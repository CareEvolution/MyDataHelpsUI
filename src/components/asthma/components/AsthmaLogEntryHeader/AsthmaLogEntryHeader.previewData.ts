import { AsthmaLogEntry } from '../../model';
import { dateToAsthmaLogEntryIdentifier } from '../../helpers';

export type AsthmaLogEntryHeaderPreviewState = 'no-logs' | 'today-log-only' | 'yesterday-log-only' | 'both-logs';

export interface AsthmaLogEntryHeaderPreviewData {
    todayLogEntry?: AsthmaLogEntry;
    yesterdayLogEntry?: AsthmaLogEntry;
}

const logEntry: AsthmaLogEntry = {
    identifier: dateToAsthmaLogEntryIdentifier(new Date()),
    symptomLevel: 'mild',
    symptoms: [],
    impacts: [],
    triggers: []
};

export const previewData: Record<AsthmaLogEntryHeaderPreviewState, AsthmaLogEntryHeaderPreviewData> = {
    'no-logs': {},
    'today-log-only': {todayLogEntry: logEntry},
    'yesterday-log-only': {yesterdayLogEntry: logEntry},
    'both-logs': {yesterdayLogEntry: logEntry, todayLogEntry: logEntry}
};