import React, { useState } from 'react';
import './AsthmaActionPlanManager.css';
import { Button, LoadingIndicator, UnstyledButton } from '../../../presentational';
import MyDataHelps, { DeviceInfo } from '@careevolution/mydatahelps-js';
import { useInitializeView } from '../../../../helpers/Initialization';
import sampleActionPlan from '../../assets/sample_aap.png'
import { asthmaDataService } from '../../helpers';
import { AsthmaActionPlan } from '../../model';
import language from '../../../../helpers/language';

export interface AsthmaActionPlanManagerProps {
    previewState?: 'loading' | 'loaded without action plan' | 'loaded with action plan';
    learnMoreUrl: string;
    editActionPlanSurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaActionPlanManagerProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>();
    const [actionPlan, setActionPlan] = useState<AsthmaActionPlan>();

    const loadActionPlan = (retryCount: number = 0): void => {
        asthmaDataService.loadParticipant().then(participant => {
            if (participant.getActionPlanTaskRunUUID()) {
                asthmaDataService.loadAsthmaActionPlan().then(actionPlan => {
                    setActionPlan(actionPlan);
                    if (actionPlan || retryCount >= 5) {
                        setLoading(false);
                    } else {
                        setTimeout(() => loadActionPlan(retryCount++), 2000);
                    }
                });
            } else {
                setActionPlan(undefined);
                setLoading(false);
            }
        });
    };

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

        asthmaDataService.loadDeviceInfo().then(deviceInfo => {
            setDeviceInfo(deviceInfo);
        });

        loadActionPlan();
    };

    useInitializeView(initialize, [], [props.previewState]);

    const onLearnMore = (): void => {
        if (props.previewState) return;
        MyDataHelps.openApplication(props.learnMoreUrl, {modal: true});
    };

    const onViewActionPlan = (): void => {
        if (props.previewState) return;

        let actionPlanUrl = `Authenticated/ReportViewer/ServeReport.ashx?reportId=${actionPlan!.id}`;
        if (deviceInfo && ['Android', 'iOS'].includes(deviceInfo.platform)) {
            // @ts-ignore
            window.webkit.messageHandlers.OpenFile.postMessage({'url': actionPlanUrl});
        } else {
            MyDataHelps.openExternalUrl('/' + actionPlanUrl);
        }
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
        <UnstyledButton className="mdhui-asthma-action-plan-manager-learn-more" onClick={() => onLearnMore()}>
            {language('asthma-action-plan-manager-learn-more')}
        </UnstyledButton>
        {loading && <LoadingIndicator/>}
        {!loading && actionPlan &&
            <div>
                <UnstyledButton className="mdhui-asthma-action-plan-manager-thumbnail-wrapper" onClick={() => onViewActionPlan()}>
                    <img className="mdhui-asthma-action-plan-manager-thumbnail" alt="thumbnail" src={actionPlan.url}/>
                </UnstyledButton>
                <div className="mdhui-asthma-action-plan-manager-button-panel">
                    <Button onClick={() => onEditActionPlan()}>{language('asthma-action-plan-manager-edit-button-text')}</Button>
                </div>
            </div>
        }
        {!loading && !actionPlan &&
            <UnstyledButton className="mdhui-asthma-action-plan-manager-not-found" onClick={() => onUploadActionPlan()}>
                <div className="mdhui-asthma-action-plan-manager-not-found-text">{language('asthma-action-plan-manager-not-found-text')}</div>
            </UnstyledButton>
        }
    </div>;
}