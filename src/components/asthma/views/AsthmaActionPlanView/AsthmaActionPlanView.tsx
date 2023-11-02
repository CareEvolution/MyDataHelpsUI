import React from 'react';
import { Layout, NavigationBar } from '../../../presentational';
import { AsthmaActionPlanManager } from '../../components';
import { AsthmaActionPlan } from '../../model';

export interface AsthmaActionPlanViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'loading' | 'loaded without action plan' | 'loaded with action plan'
    learnMoreUrl: string;
    onViewActionPlan: (actionPlan: AsthmaActionPlan) => void;
    editActionPlanSurveyName: string;
}

export default function (props: AsthmaActionPlanViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}/>
        <AsthmaActionPlanManager
            previewState={props.previewState}
            learnMoreUrl={props.learnMoreUrl}
            onViewActionPlan={props.onViewActionPlan}
            editActionPlanSurveyName={props.editActionPlanSurveyName}
        />
    </Layout>;
}
