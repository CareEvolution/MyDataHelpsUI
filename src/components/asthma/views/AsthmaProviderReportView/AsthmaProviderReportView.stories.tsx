import React from 'react';
import AsthmaProviderReportView, { AsthmaProviderReportViewProps } from './AsthmaProviderReportView';

export default {
    title: 'Asthma/Views/AsthmaProviderReportView',
    component: AsthmaProviderReportView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaProviderReportViewProps) => {
    return <AsthmaProviderReportView {...args} logEntrySurveyName="Log Symptoms - Today" />;
};

export const Default = {
    args: {
        previewState: 'default'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'default', 'as caregiver']
        }
    },
    render: render
};

