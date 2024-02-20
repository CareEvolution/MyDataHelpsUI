import { AsthmaLogEntry, AsthmaParticipant } from '../../model';
import { DeviceDataPoint, SurveyAnswer } from '@careevolution/mydatahelps-js';

export type AsthmaProviderReportPreviewState = 'default';

export interface AsthmaProviderReportPreviewData {
    participant: AsthmaParticipant;
    logEntries: AsthmaLogEntry[];
    surveyAnswers: SurveyAnswer[];
    airQualityDataPoints: DeviceDataPoint[];
}

export const previewData: Record<AsthmaProviderReportPreviewState, AsthmaProviderReportPreviewData> = {
    'default': {
        participant: {
            getFirstName: () => 'Leroy'
        } as AsthmaParticipant,
        logEntries: [],
        surveyAnswers: [],
        airQualityDataPoints: []
    }
};
