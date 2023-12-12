import { AsthmaParticipant } from '../../model';
import { AsthmaControlStatusHeaderPreviewState } from '../../components/AsthmaControlStatusHeader';
import { AsthmaLogEntryHeaderPreviewState } from '../../components/AsthmaLogEntryHeader';
import { AsthmaControlCalendarPreviewState } from '../../components/AsthmaControlCalendar';

export type AsthmaDashboardViewPreviewState = 'default';

export interface AsthmaDashboardViewPreviewData {
    participant: AsthmaParticipant;
    controlStatusHeaderPreviewState: AsthmaControlStatusHeaderPreviewState
    logEntryHeaderPreviewState: AsthmaLogEntryHeaderPreviewState;
    controlCalendarPreviewState: AsthmaControlCalendarPreviewState;
}

export const previewData: Record<AsthmaDashboardViewPreviewState, AsthmaDashboardViewPreviewData> = {
    'default': {
        participant: {
            getFirstName: () => 'Leroy',
            hasPairedDevice: () => false,
        } as AsthmaParticipant,
        controlStatusHeaderPreviewState: 'no-data',
        logEntryHeaderPreviewState: 'yesterday-log-only',
        controlCalendarPreviewState: 'some-logs'
    }
};
