import { AsthmaCalendarViewHeaderPreviewState } from '../../container/AsthmaCalendarViewHeader';

export type AsthmaCalendarViewPreviewState = 'default';

export interface AsthmaCalendarViewPreviewData {
    headerPreviewState: AsthmaCalendarViewHeaderPreviewState;
}

export const previewData: Record<AsthmaCalendarViewPreviewState, AsthmaCalendarViewPreviewData> = {
    'default': {
        headerPreviewState: 'default'
    }
};