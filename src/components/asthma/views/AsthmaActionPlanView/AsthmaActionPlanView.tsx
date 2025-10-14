import React from 'react';
import { Layout, NavigationBar } from '../../../presentational';
import { AsthmaActionPlanManager } from '../../components';
import { AsthmaActionPlanManagerPreviewState } from '../../components/AsthmaActionPlanManager/AsthmaActionPlanManager.previewData';

export interface AsthmaActionPlanViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: AsthmaActionPlanManagerPreviewState;
    learnMoreUrl: string;
    editActionPlanSurveyName: string;
}

export default function AsthmaActionPlanView(props: AsthmaActionPlanViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true} />
        <AsthmaActionPlanManager
            previewState={props.previewState}
            learnMoreUrl={props.learnMoreUrl}
            editActionPlanSurveyName={props.editActionPlanSurveyName}
        />
    </Layout>;
}
