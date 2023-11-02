import React from 'react';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService } from '../../helpers';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaPostEnrollmentSurveyTriggerProps {
    previewState?: boolean;
    postEnrollmentSurveyName: string;
    postEnrollmentMobileSurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaPostEnrollmentSurveyTriggerProps) {

    useInitializeView(() => {
        if (props.previewState) return;

        asthmaDataService.loadSurveyAnswers([props.postEnrollmentSurveyName, props.postEnrollmentMobileSurveyName]).then(surveyAnswers => {
            if (!surveyAnswers.find(sa => sa.surveyName === props.postEnrollmentSurveyName)) {
                MyDataHelps.startSurvey(props.postEnrollmentSurveyName);
            } else if (!surveyAnswers.find(sa => sa.surveyName === props.postEnrollmentMobileSurveyName)) {
                MyDataHelps.getDeviceInfo().then(deviceInfo => {
                    if (['iOS', 'Android'].includes(deviceInfo.platform)) {
                        MyDataHelps.startSurvey(props.postEnrollmentMobileSurveyName);
                    }
                })
            }
        });
    });

    return null;
}