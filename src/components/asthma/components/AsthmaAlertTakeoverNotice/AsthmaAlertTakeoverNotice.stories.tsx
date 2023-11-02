import React from 'react';
import AsthmaAlertTakeoverNotice from './AsthmaAlertTakeoverNotice';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaAlertTakeoverNotice',
    component: AsthmaAlertTakeoverNotice,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAlertTakeoverNoticeStoryProps {
    state: 'default' | 'loading';
    message: string;
}

const render = (args: AsthmaAlertTakeoverNoticeStoryProps) => <Layout colorScheme="auto">
    <AsthmaAlertTakeoverNotice previewState={args.state} message={args.message} logEntrySurveyName="Log Entry Survey Name"/>
</Layout>;

export const Default = {
    args: {
        message: 'Your home AQI is unhealthy',
        state: 'default'
    },
    argTypes: {
        state: {
            control: 'radio',
            options: ['default', 'loading']
        }
    },
    render: render
};

