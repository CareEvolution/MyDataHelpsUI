import React, { useState } from 'react';
import './AsthmaActionPlan.css';
import { Button, LoadingIndicator } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { useInitializeView } from '../../../../helpers/Initialization';
import sampleActionPlan from '../../assets/sample_aap.png'
import { asthmaDataService } from '../../helpers';

export interface AsthmaActionPlanProps {
    previewState?: 'loading' | 'loaded without action plan' | 'loaded with action plan';
    learnMoreUrl: string;
    editActionPlanSurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaActionPlanProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [actionPlanUrl, setActionPlanUrl] = useState<string>();

    const initialize = (retryCount: number = 0): void => {
        setLoading(true);

        if (props.previewState === 'loaded with action plan') {
            setActionPlanUrl(sampleActionPlan);
            setLoading(false);
            return;
        }
        if (props.previewState === 'loaded without action plan') {
            setActionPlanUrl(undefined);
            setLoading(false);
            return;
        }
        if (props.previewState === 'loading') {
            return;
        }

        asthmaDataService.loadParticipant().then(participant => {
            if (participant.getActionPlanTaskRunUUID()) {
                MyDataHelps.invokeCustomApi('Asthma.ActionPlan', 'GET', '', true).then(response => {
                    setActionPlanUrl(response ? `data:image/jpeg;base64,${response.Content}` : undefined);
                    if (response || retryCount >= 5) {
                        setLoading(false);
                    } else {
                        setTimeout(() => initialize(retryCount++), 2000);
                    }
                });
            } else {
                setActionPlanUrl(undefined);
                setLoading(false);
            }
        });
    };

    useInitializeView(initialize, [], [props.previewState]);

    const onLearnMore = (): void => {
        if (props.previewState) return;
        MyDataHelps.openApplication(props.learnMoreUrl, {modal: true});
    };

    const onViewActionPlan = (): void => {
        if (props.previewState) return;
        MyDataHelps.openExternalUrl(actionPlanUrl!);
    };

    const onEditActionPlan = (): void => {
        if (props.previewState) return;
        MyDataHelps.startSurvey(props.editActionPlanSurveyName);
    };

    const onUploadActionPlan = (): void => {
        if (props.previewState) return;
        MyDataHelps.startSurvey(props.editActionPlanSurveyName);
    };

    return <div className="mdhui-asthma-action-plan">
        <div className="mdhui-asthma-action-plan-title">Asthma Action Plan</div>
        <div className="mdhui-asthma-action-plan-instructions">Save a photo of your asthma action plan for easy reference.</div>
        <div className="mdhui-asthma-action-plan-learn-more" onClick={() => onLearnMore()}>What's an asthma action plan?</div>
        {loading && <LoadingIndicator/>}
        {!loading && actionPlanUrl &&
            <div>
                <div className="mdhui-asthma-action-plan-thumbnail-wrapper" onClick={() => onViewActionPlan()}>
                    <img className="mdhui-asthma-action-plan-thumbnail" alt="thumbnail" src={actionPlanUrl}/>
                </div>
                <div className="mdhui-asthma-action-plan-button-panel">
                    <Button onClick={() => onEditActionPlan()}>Edit</Button>
                </div>
            </div>
        }
        {!loading && !actionPlanUrl &&
            <div className="mdhui-asthma-action-plan-not-found" onClick={() => onUploadActionPlan()}>
                <div className="mdhui-asthma-action-plan-not-found-text">Tap to add photo</div>
            </div>
        }
    </div>;
}