import React from 'react';
import AsthmaAlertTakeoverNotice, { AsthmaAlertTakeoverNoticeProps } from './AsthmaAlertTakeoverNotice';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaAlertTakeoverNotice',
    component: AsthmaAlertTakeoverNotice,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAlertTakeoverNoticeStoryProps extends AsthmaAlertTakeoverNoticeProps {
    colorScheme: 'auto' | 'light' | 'dark';
    message: string;
}

const render = (args: AsthmaAlertTakeoverNoticeStoryProps) => {
    return <Layout colorScheme={args.colorScheme}>
        <AsthmaAlertTakeoverNotice {...args} logEntrySurveyName="Log Entry Survey Name"/>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded',
        message: 'Your home AQI is unhealthy'
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
            options: ['loading', 'loaded']
        }
    },
    render: render
};

