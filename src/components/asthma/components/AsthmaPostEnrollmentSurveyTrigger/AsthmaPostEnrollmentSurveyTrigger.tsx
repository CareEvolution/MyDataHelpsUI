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

        if (props.postEnrollmentSurveyName || props.postEnrollmentMobileSurveyName) {
            asthmaDataService.loadPostEnrollmentFlags().then(flags => {
                if (props.postEnrollmentSurveyName && !flags.hasBeenShownPostEnrollmentSurvey) {
                    asthmaDataService.markPostEnrollmentSurveyShown().then();
                    MyDataHelps.startSurvey(props.postEnrollmentSurveyName);
                } else if (props.postEnrollmentMobileSurveyName && !flags.hasBeenShownPostEnrollmentMobileSurvey) {
                    asthmaDataService.markPostEnrollmentMobileSurveyShown().then();
                    MyDataHelps.startSurvey(props.postEnrollmentMobileSurveyName);
                }
            });
        }
    });

    return null;
}