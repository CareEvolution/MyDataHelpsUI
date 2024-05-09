import React from 'react';
import { useInitializeView } from '../../../../helpers';
import { asthmaDataService } from '../../helpers';
import MyDataHelps, { SurveyAnswer } from '@careevolution/mydatahelps-js';

export interface AsthmaPostEnrollmentSurveyTriggerProps {
    previewState?: boolean;
    postEnrollmentSurveyName: string;
    postEnrollmentMobileSurveyName: string;
    logTodayEntrySurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaPostEnrollmentSurveyTriggerProps) {

    const launchLoggingIfNecessary = (surveyAnswers: SurveyAnswer[]) => {
        if (!surveyAnswers.find(sa => sa.surveyName === props.logTodayEntrySurveyName)) {
            MyDataHelps.queryDeviceData({namespace: 'Project', type: 'LogAutoLaunched'}).then(results => {
                if (!results.deviceDataPoints.length) {
                    MyDataHelps.persistDeviceData([{type: 'LogAutoLaunched', value: new Date().toISOString()}]).then(() => {
                        MyDataHelps.startSurvey(props.logTodayEntrySurveyName);
                    });
                }
            });
        }
    };

    useInitializeView(() => {
        if (props.previewState) return;

        let surveyNames = [
            props.postEnrollmentSurveyName,
            props.postEnrollmentMobileSurveyName,
            props.logTodayEntrySurveyName
        ];

        asthmaDataService.loadSurveyAnswers(surveyNames).then(surveyAnswers => {
            if (!surveyAnswers.find(sa => sa.surveyName === props.postEnrollmentSurveyName)) {
                MyDataHelps.startSurvey(props.postEnrollmentSurveyName);
            } else if (!surveyAnswers.find(sa => sa.surveyName === props.postEnrollmentMobileSurveyName)) {
                MyDataHelps.getDeviceInfo().then(deviceInfo => {
                    if (['iOS', 'Android'].includes(deviceInfo.platform)) {
                        MyDataHelps.startSurvey(props.postEnrollmentMobileSurveyName);
                    } else {
                        launchLoggingIfNecessary(surveyAnswers);
                    }
                });
            } else {
                launchLoggingIfNecessary(surveyAnswers);
            }
        });
    });

    return null;
}