import React, { useState } from 'react';
import './AsthmaDashboardViewHeader.css';
import { asthmaDataService } from '../../helpers';
import { AsthmaParticipant } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import AsthmaControlStatusHeader from '../AsthmaControlStatusHeader';
import AsthmaLogEntryHeader from '../AsthmaLogEntryHeader';
import { AsthmaDashboardViewHeaderPreviewState, previewData } from './AsthmaDashboardViewHeader.previewData';

export interface AsthmaDashboardViewHeaderProps {
    previewState?: AsthmaDashboardViewHeaderPreviewState;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaDashboardViewHeaderProps) {
    let [loading, setLoading] = useState<boolean>(true);
    let [participant, setParticipant] = useState<AsthmaParticipant>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setParticipant(previewData[props.previewState].participant);
            setLoading(false);
            return;
        }

        asthmaDataService.loadParticipant().then(participant => {
            setParticipant(participant);
            setLoading(false);
        });
    });

    if (loading && !participant) {
        return null;
    }

    return <div className="mdhui-asthma-dashboard-view-header" ref={props.innerRef}>
        <div className="mdhui-asthma-dashboard-view-header-greeting">
            Hi {participant!.getFirstName()},
        </div>
        <AsthmaControlStatusHeader
            previewState={props.previewState ? previewData[props.previewState].controlStatusPreviewState : undefined}
            participant={participant!}
        />
        <AsthmaLogEntryHeader
            previewState={props.previewState ? previewData[props.previewState].logEntryPreviewState : undefined}
            logTodayEntrySurveyName={props.logTodayEntrySurveyName}
            logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
        />
    </div>;
}