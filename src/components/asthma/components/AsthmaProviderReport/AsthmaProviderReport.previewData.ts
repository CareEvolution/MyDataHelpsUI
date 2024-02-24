import { AsthmaLogEntry, AsthmaParticipant } from '../../model';
import { DeviceDataPoint, Guid, SurveyAnswer } from '@careevolution/mydatahelps-js';
import { dateToAsthmaLogEntryIdentifier } from "../../helpers";
import { add } from 'date-fns';

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
            getId: () => 'ef698523-118a-414a-bd01-ff97c6cb31f9' as Guid,
            getFirstName: () => 'Leroy'
        } as AsthmaParticipant,
        logEntries: [
            {
                identifier: dateToAsthmaLogEntryIdentifier(add(new Date(), {days: -5})),
                symptomLevel: 'none',
                symptoms: [],
                impacts: [],
                triggers: []
            },
            {
                identifier: dateToAsthmaLogEntryIdentifier(add(new Date(), {days: -15})),
                symptomLevel: 'moderate',
                symptoms: [],
                impacts: ['Wake up at night'],
                triggers: []
            },
            {
                identifier: dateToAsthmaLogEntryIdentifier(add(new Date(), {days: -25})),
                symptomLevel: 'moderate',
                symptoms: [],
                impacts: [],
                triggers: []
            }
        ],
        surveyAnswers: [],
        airQualityDataPoints: []
    }
};
