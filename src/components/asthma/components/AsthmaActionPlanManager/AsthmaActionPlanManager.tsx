import React, { useState } from 'react';
import './AsthmaActionPlanManager.css';
import { Button, LoadingIndicator } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { useInitializeView } from '../../../../helpers/Initialization';
import sampleActionPlan from '../../assets/sample_aap.png'
import { asthmaDataService } from '../../helpers';
import { AsthmaActionPlan } from '../../model';
import language from '../../../../helpers/language';

export interface AsthmaActionPlanManagerProps {
    previewState?: 'loading' | 'loaded without action plan' | 'loaded with action plan';
    learnMoreUrl: string;
    onViewActionPlan: (actionPlan: AsthmaActionPlan) => void;
    editActionPlanSurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaActionPlanManagerProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [actionPlan, setActionPlan] = useState<AsthmaActionPlan>();

    const initialize = (retryCount: number = 0): void => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }
        if (props.previewState === 'loaded with action plan') {
            setActionPlan({id: 'sample', url: sampleActionPlan});
            setLoading(false);
            return;
        }
        if (props.previewState === 'loaded without action plan') {
            setActionPlan(undefined);
            setLoading(false);
            return;
        }

        asthmaDataService.loadParticipant().then(participant => {
            if (participant.getActionPlanTaskRunUUID()) {
                asthmaDataService.loadAsthmaActionPlan().then(actionPlan => {
                    setActionPlan(actionPlan);
                    if (actionPlan || retryCount >= 5) {
                        setLoading(false);
                    } else {
                        setTimeout(() => initialize(retryCount++), 2000);
                    }
                });
            } else {
                setActionPlan(undefined);
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
        props.onViewActionPlan(actionPlan!);
    };

    const onEditActionPlan = (): void => {
        if (props.previewState) return;
        MyDataHelps.startSurvey(props.editActionPlanSurveyName);
    };

    const onUploadActionPlan = (): void => {
        if (props.previewState) return;
        MyDataHelps.startSurvey(props.editActionPlanSurveyName);
    };

    return <div className="mdhui-asthma-action-plan-manager">
        <div className="mdhui-asthma-action-plan-manager-title">{language('asthma-action-plan-manager-title')}</div>
        <div className="mdhui-asthma-action-plan-manager-instructions">{language('asthma-action-plan-manager-instructions')}</div>
        <div className="mdhui-asthma-action-plan-manager-learn-more" onClick={() => onLearnMore()}>{language('asthma-action-plan-manager-learn-more')}</div>
        {loading && <LoadingIndicator/>}
        {!loading && actionPlan &&
            <div>
                <div className="mdhui-asthma-action-plan-manager-thumbnail-wrapper" onClick={() => onViewActionPlan()}>
                    <img className="mdhui-asthma-action-plan-manager-thumbnail" alt="thumbnail" src={actionPlan.url}/>
                </div>
                <div className="mdhui-asthma-action-plan-manager-button-panel">
                    <Button onClick={() => onEditActionPlan()}>{language('asthma-action-plan-manager-edit-button-text')}</Button>
                </div>
            </div>
        }
        {!loading && !actionPlan &&
            <div className="mdhui-asthma-action-plan-manager-not-found" onClick={() => onUploadActionPlan()}>
                <div className="mdhui-asthma-action-plan-manager-not-found-text">{language('asthma-action-plan-manager-not-found-text')}</div>
            </div>
        }
    </div>;
}