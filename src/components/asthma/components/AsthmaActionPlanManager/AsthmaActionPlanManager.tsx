import React, { useEffect, useState } from 'react';
import './AsthmaActionPlanManager.css';
import { Button, LoadingIndicator, Title, UnstyledButton } from '../../../presentational';
import MyDataHelps, { DeviceInfo } from '@careevolution/mydatahelps-js';
import { asthmaDataService, AsthmaDataService, caregiverVariableLanguage } from '../../helpers';
import { AsthmaActionPlan, AsthmaParticipant } from '../../model';
import { language } from '../../../../helpers';
import { AsthmaActionPlanManagerPreviewState, previewData } from './AsthmaActionPlanManager.previewData';

export interface AsthmaActionPlanManagerProps {
    previewState?: AsthmaActionPlanManagerPreviewState;
    /**
     * @deprecated Use `onLearnMore` instead.
     */
    learnMoreUrl?: string;
    onLearnMore?: () => void;
    /**
     * @deprecated Use `onEditActionPlan` instead.
     */
    editActionPlanSurveyName?: string;
    onEditActionPlan?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaActionPlanManagerProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>();
    const [participant, setParticipant] = useState<AsthmaParticipant>();
    const [actionPlan, setActionPlan] = useState<AsthmaActionPlan>();

    const loadActionPlan = (dataService: AsthmaDataService, retryCount: number = 0): void => {
        dataService.loadParticipant().then(participant => {
            setParticipant(participant);
            if (participant.getActionPlanTaskRunUUID()) {
                dataService.loadAsthmaActionPlan().then(actionPlan => {
                    setActionPlan(actionPlan);
                    if (actionPlan || retryCount >= 5) {
                        setLoading(false);
                    } else {
                        setTimeout(() => loadActionPlan(dataService, retryCount + 1), 2000);
                    }
                });
            } else {
                setActionPlan(undefined);
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        setLoading(true);

        const dataService = props.previewState ? previewData.createDataService(props.previewState) : asthmaDataService;

        dataService.loadDeviceInfo().then(deviceInfo => {
            setDeviceInfo(deviceInfo);
        });

        loadActionPlan(dataService);

        MyDataHelps.on('surveyDidFinish', () => loadActionPlan(dataService));
        return () => {
            MyDataHelps.off('surveyDidFinish', () => loadActionPlan(dataService));
        };
    }, [props.previewState]);

    const onLearnMore = (): void => {
        if (props.previewState) return;
        if (props.onLearnMore) {
            props.onLearnMore();
        } else if (props.learnMoreUrl) {
            MyDataHelps.openApplication(props.learnMoreUrl, { modal: true });
        }
    };

    const onViewActionPlan = (): void => {
        if (props.previewState) return;

        let actionPlanUrl = `Authenticated/ReportViewer/ServeReport.ashx?reportId=${actionPlan!.id}`;
        if (deviceInfo && ['Android', 'iOS'].includes(deviceInfo.platform)) {
            // @ts-ignore
            window.webkit.messageHandlers.OpenFile.postMessage({ 'url': actionPlanUrl });
        } else {
            MyDataHelps.openExternalUrl('/' + actionPlanUrl);
        }
    };

    const onEditActionPlan = (): void => {
        if (props.previewState) return;
        if (props.onEditActionPlan) {
            setLoading(true);
            props.onEditActionPlan();
        } else if (props.editActionPlanSurveyName) {
            setLoading(true);
            MyDataHelps.startSurvey(props.editActionPlanSurveyName);
        }
    };

    const onUploadActionPlan = (): void => {
        if (props.previewState) return;
        if (props.onEditActionPlan) {
            setLoading(true);
            props.onEditActionPlan();
        } else if (props.editActionPlanSurveyName) {
            setLoading(true);
            MyDataHelps.startSurvey(props.editActionPlanSurveyName);
        }
    };

    return <div className="mdhui-asthma-action-plan-manager">
        <Title order={2} className="mdhui-asthma-action-plan-manager-title">{language('asthma-action-plan-manager-title')}</Title>
        {participant &&
            <div className="mdhui-asthma-action-plan-manager-instructions">{caregiverVariableLanguage(participant, 'asthma-action-plan-manager-instructions')}</div>
        }
        <UnstyledButton className="mdhui-asthma-action-plan-manager-learn-more" onClick={() => onLearnMore()}>
            {language('asthma-action-plan-manager-learn-more')}
        </UnstyledButton>
        {loading && <LoadingIndicator />}
        {!loading && actionPlan &&
            <div>
                <UnstyledButton className="mdhui-asthma-action-plan-manager-thumbnail-wrapper" onClick={() => onViewActionPlan()}>
                    <img className="mdhui-asthma-action-plan-manager-thumbnail" alt="thumbnail" src={actionPlan.url} />
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