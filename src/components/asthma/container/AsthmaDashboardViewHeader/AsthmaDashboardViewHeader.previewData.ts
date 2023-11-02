import { AsthmaParticipant } from '../../model';
import { AsthmaLogEntryHeaderPreviewState } from '../AsthmaLogEntryHeader';
import { AsthmaControlStatusHeaderPreviewState } from '../AsthmaControlStatusHeader';

export type AsthmaDashboardViewHeaderPreviewState = 'default';

export interface AsthmaDashboardViewHeaderPreviewData {
    participant: AsthmaParticipant;
    logEntryPreviewState: AsthmaLogEntryHeaderPreviewState;
    controlStatusPreviewState: AsthmaControlStatusHeaderPreviewState;
}

export const previewData: Record<AsthmaDashboardViewHeaderPreviewState, AsthmaDashboardViewHeaderPreviewData> = {
    'default': {
        participant: {
            getFirstName: () => 'Leroy',
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        } as AsthmaParticipant,
        logEntryPreviewState: 'both-logs',
        controlStatusPreviewState: 'not-controlled'
    }
};