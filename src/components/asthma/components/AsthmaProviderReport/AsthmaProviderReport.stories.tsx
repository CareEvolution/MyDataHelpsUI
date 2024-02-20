import React from 'react';
import AsthmaProviderReport, { AsthmaProviderReportProps } from './AsthmaProviderReport';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaProviderReport',
    component: AsthmaProviderReport,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaProviderReportStoryArgs extends AsthmaProviderReportProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AsthmaProviderReportStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <AsthmaProviderReport {...args} logTodayEntrySurveyName="Log Symptoms - Today"/>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'default'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'default', 'live']
        }
    },
    render: render
};