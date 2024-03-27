import React from 'react';
import AsthmaAirQualities, { AsthmaAirQualitiesProps } from './AsthmaAirQualities';
import { Card, Layout } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Components/AsthmaAirQualities',
    component: AsthmaAirQualities,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAirQualitiesStoryArgs extends AsthmaAirQualitiesProps {
    colorScheme: 'auto' | 'light' | 'dark';
    language: 'English' | 'Spanish';
    canEditSettings: boolean;
}

const render = (args: AsthmaAirQualitiesStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <AsthmaAirQualities {...args} editZipCodesSurveyName={args.canEditSettings ? 'some_url' : undefined}/>
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        previewState: 'some data (control)',
        canEditSettings: false
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
            options: ['loading', 'neither configured', 'one configured', 'no data (control)', 'no data (date)', 'some data (control)', 'some data (date)', 'all data']
        },
        canEditSettings: {
            name: 'can edit settings'
        }
    },
    render: render
};