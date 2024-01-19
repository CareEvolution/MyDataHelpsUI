import React from 'react';
import AsthmaAirQualities, { AsthmaAirQualitiesProps } from './AsthmaAirQualities';
import { Card, Layout } from '../../../presentational';
import { AsthmaAirQualitiesPreviewState } from './AsthmaAirQualities.previewData';

export default {
    title: 'Asthma/Components/AsthmaAirQualities',
    component: AsthmaAirQualities,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAirQualitiesStoryArgs {
    previewState: AsthmaAirQualitiesPreviewState;
    canEditSettings: boolean;
}

const render = (args: AsthmaAirQualitiesStoryArgs) => {
    return <Layout colorScheme="auto">
        <Card>
            <AsthmaAirQualities previewState={args.previewState} editZipCodesSurveyName={args.canEditSettings ? 'some_url' : undefined} {...({} as AsthmaAirQualitiesProps)} />
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        previewState: 'some data (control)',
        canEditSettings: false
    },
    argTypes: {
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