import { AsthmaLogEntryHeaderPreviewState } from '../AsthmaLogEntryHeader';
import { AsthmaControlCalendarPreviewState } from '../AsthmaControlCalendar';

export type AsthmaCalendarViewHeaderPreviewState = 'default';

export interface AsthmaCalendarViewHeaderPreviewData {
    controlCalendarPreviewState: AsthmaControlCalendarPreviewState;
    logEntryPreviewState: AsthmaLogEntryHeaderPreviewState;
}

export const previewData: Record<AsthmaCalendarViewHeaderPreviewState, AsthmaCalendarViewHeaderPreviewData> = {
    'default': {
        controlCalendarPreviewState: 'some-logs',
        logEntryPreviewState: 'yesterday-log-only'
    }
};