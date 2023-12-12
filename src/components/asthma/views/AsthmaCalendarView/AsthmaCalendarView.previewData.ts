import { AsthmaLogEntryHeaderPreviewState } from '../../components/AsthmaLogEntryHeader';
import { AsthmaControlCalendarPreviewState } from '../../components/AsthmaControlCalendar';

export type AsthmaCalendarViewPreviewState = 'default';

export interface AsthmaCalendarViewPreviewData {
    controlCalendarPreviewState: AsthmaControlCalendarPreviewState;
    logEntryHeaderPreviewState: AsthmaLogEntryHeaderPreviewState;
}

export const previewData: Record<AsthmaCalendarViewPreviewState, AsthmaCalendarViewPreviewData> = {
    'default': {
        controlCalendarPreviewState: 'some-logs',
        logEntryHeaderPreviewState: 'yesterday-log-only'
    }
};
