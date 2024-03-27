import React from 'react';
import AsthmaAlertTakeoverNotice, { AsthmaAlertTakeoverNoticeProps } from './AsthmaAlertTakeoverNotice';
import { Layout } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Components/AsthmaAlertTakeoverNotice',
    component: AsthmaAlertTakeoverNotice,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAlertTakeoverNoticeStoryProps extends AsthmaAlertTakeoverNoticeProps {
    colorScheme: 'auto' | 'light' | 'dark';
    language: 'English' | 'Spanish';
    message: string;
}

const render = (args: AsthmaAlertTakeoverNoticeStoryProps) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <Layout colorScheme={args.colorScheme}>
        <AsthmaAlertTakeoverNotice {...args} logEntrySurveyName="Log Entry Survey Name"/>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        previewState: 'loaded',
        message: 'Your home AQI is unhealthy'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        language: {
            name: 'language',
            control: 'radio',
            options: ['English', 'Spanish']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'loaded']
        }
    },
    render: render
};

