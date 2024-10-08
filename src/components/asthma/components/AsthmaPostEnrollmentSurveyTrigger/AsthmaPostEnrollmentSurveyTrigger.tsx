import React from 'react';
import { useInitializeView } from '../../../../helpers';
import { asthmaDataService } from '../../helpers';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { AsthmaParticipantMode } from '../../model';

export interface AsthmaPostEnrollmentSurveyTriggerProps {
    previewState?: boolean;
    postEnrollmentSurveyName: string;
    postEnrollmentMobileSurveyName: string;
    logTodayEntrySurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaPostEnrollmentSurveyTriggerProps) {

    const launchLoggingIfNecessary = () => {
        asthmaDataService.checkSurveyAnswerExists(props.logTodayEntrySurveyName).then(surveyAnswerExists => {
            if (!surveyAnswerExists) {
                MyDataHelps.queryDeviceData({ namespace: 'Project', type: 'LogAutoLaunched' }).then(results => {
                    if (!results.deviceDataPoints.length) {
                        MyDataHelps.persistDeviceData([{ type: 'LogAutoLaunched', value: new Date().toISOString() }]).then(() => {
                            MyDataHelps.startSurvey(props.logTodayEntrySurveyName);
                        });
                    }
                });
            }
        });
    };

    useInitializeView(() => {
        if (props.previewState) return;

        asthmaDataService.loadSurveyAnswers([props.postEnrollmentSurveyName, props.postEnrollmentMobileSurveyName]).then(surveyAnswers => {
            if (!surveyAnswers.find(sa => sa.surveyName === props.postEnrollmentSurveyName)) {
                MyDataHelps.startSurvey(props.postEnrollmentSurveyName);
            } else if (!surveyAnswers.find(sa => sa.surveyName === props.postEnrollmentMobileSurveyName)) {
                Promise.all([MyDataHelps.getParticipantInfo(), MyDataHelps.getDeviceInfo()]).then(([participantInfo, deviceInfo]) => {
                    const participantMode = participantInfo.customFields['ParticipantMode'] as AsthmaParticipantMode ?? 'Self';
                    if (participantMode !== 'Caregiver' && ['iOS', 'Android'].includes(deviceInfo.platform)) {
                        MyDataHelps.startSurvey(props.postEnrollmentMobileSurveyName);
                    } else {
                        launchLoggingIfNecessary();
                    }
                });
            } else {
                launchLoggingIfNecessary();
            }
        });
    });

    return null;
}