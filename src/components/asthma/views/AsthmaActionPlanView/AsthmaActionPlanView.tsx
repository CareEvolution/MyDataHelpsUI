import React from 'react';
import { Layout, NavigationBar } from '../../../presentational';
import { AsthmaActionPlanManager } from '../../components';

export interface AsthmaActionPlanViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'loading' | 'loaded without action plan' | 'loaded with action plan'
    learnMoreUrl: string;
    editActionPlanSurveyName: string;
}

export default function (props: AsthmaActionPlanViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}/>
        <AsthmaActionPlanManager
            previewState={props.previewState}
            learnMoreUrl={props.learnMoreUrl}
            editActionPlanSurveyName={props.editActionPlanSurveyName}
        />
    </Layout>;
}
