import { AsthmaDashboardViewHeaderPreviewState } from '../../container/AsthmaDashboardViewHeader';
import { AsthmaControlCalendarPreviewState } from '../../container/AsthmaControlCalendar';

export type AsthmaDashboardViewPreviewState = 'default';

export interface AsthmaDashboardViewPreviewData {
    headerPreviewState: AsthmaDashboardViewHeaderPreviewState;
    controlCalendarPreviewState: AsthmaControlCalendarPreviewState;
}

export const previewData: Record<AsthmaDashboardViewPreviewState, AsthmaDashboardViewPreviewData> = {
    'default': {
        headerPreviewState: 'default',
        controlCalendarPreviewState: 'some-logs'
    }
};