import React from 'react';
import { Layout, NavigationBar } from '../../../presentational';
import { AsthmaActionPlan } from '../../components';

export interface AsthmaActionPlanViewProps {
    previewState?: 'loading' | 'loaded without action plan' | 'loaded with action plan'
    colorScheme?: 'light' | 'dark' | 'auto';
    learnMoreUrl: string;
    editActionPlanSurveyName: string;
}

export default function (props: AsthmaActionPlanViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}/>
        <AsthmaActionPlan
            previewState={props.previewState}
            learnMoreUrl={props.learnMoreUrl}
            editActionPlanSurveyName={props.editActionPlanSurveyName}
        />
    </Layout>;
}
