import React from 'react';
import AsthmaAirQualities, { AsthmaAirQualitiesProps } from './AsthmaAirQualities';
import { Card, Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaAirQualities',
    component: AsthmaAirQualities,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAirQualitiesStoryArgs extends AsthmaAirQualitiesProps {
    colorScheme: 'auto' | 'light' | 'dark';
    canEditSettings: boolean;
}

const render = (args: AsthmaAirQualitiesStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <AsthmaAirQualities {...args} editZipCodesSurveyName={args.canEditSettings ? 'some_url' : undefined}/>
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'some data (control)',
        canEditSettings: false
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
            options: ['neither configured', 'one configured', 'no data (control)', 'no data (date)', 'some data (control)', 'some data (date)', 'all data']
        },
        canEditSettings: {
            name: 'can edit settings'
        }
    },
    render: render
};