import { AsthmaLogEntry, AsthmaParticipant } from '../../model';
import { DeviceDataPoint, Guid, SurveyAnswer } from '@careevolution/mydatahelps-js';
import { AsthmaDataService, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { add } from 'date-fns';
import { noop } from '../../../../helpers/functions';

export type AsthmaProviderReportPreviewState = 'loading' | 'default' | 'as caregiver';

export const previewData = {
    createDataService: (previewState: AsthmaProviderReportPreviewState): AsthmaDataService => {
        return {
            loadParticipant: (): Promise<AsthmaParticipant> => previewState === 'loading' ? new Promise(() => noop) : Promise.resolve({
                getId: () => 'ef698523-118a-414a-bd01-ff97c6cb31f9' as Guid,
                getFirstName: () => 'Sally',
                getParticipantMode: () => previewState === 'as caregiver' ? 'Caregiver' : 'Self',
                getCareRecipientName: () => previewState === 'as caregiver' ? 'Leroy' : undefined
            } as AsthmaParticipant),
            loadLogEntries: (): Promise<AsthmaLogEntry[]> => Promise.resolve([
                {
                    identifier: dateToAsthmaLogEntryIdentifier(add(new Date(), { days: -5 })),
                    symptomLevel: 'none',
                    symptoms: [],
                    impacts: [],
                    triggers: []
                },
                {
                    identifier: dateToAsthmaLogEntryIdentifier(add(new Date(), { days: -15 })),
                    symptomLevel: 'moderate',
                    symptoms: [],
                    impacts: ['Wake up at night'],
                    triggers: []
                },
                {
                    identifier: dateToAsthmaLogEntryIdentifier(add(new Date(), { days: -25 })),
                    symptomLevel: 'moderate',
                    symptoms: [],
                    impacts: [],
                    triggers: []
                }
            ]),
            loadSurveyAnswers: (_unused1: string | string[], _unused2?: Date): Promise<SurveyAnswer[]> => Promise.resolve([
                {
                    stepIdentifier: 'MISSED_DOSES_REASONS',
                    answers: ['Unable to afford the medications', 'Medications not working']
                } as SurveyAnswer,
                {
                    stepIdentifier: 'MISSED_DOSES_REASONS',
                    answers: ['None of the above']
                } as SurveyAnswer,
                {
                    stepIdentifier: 'MISSED_DOSES_REASONS',
                    answers: ['Don\'t want to run out, so purposefully skipping doses']
                } as SurveyAnswer,
                {
                    stepIdentifier: 'MISSED_DOSES_REASONS',
                    answers: [
                        'Unable to afford the medications',
                        'Difficulty getting refills',
                        'Trouble remembering to take them',
                        'I\'m confused which inhaler to take when',
                        'Don\'t know why I should take it',
                        'Concerns over side effects',
                        'Medications not working',
                        'Don\'t want to run out, so purposefully skipping doses',
                        'Never learned how to take them',
                        'None of the above'
                    ]
                } as SurveyAnswer
            ]),
            loadAirQualityDataPoints: (_unused: Date): Promise<DeviceDataPoint[]> => Promise.resolve([])
        } as AsthmaDataService;
    }
};
