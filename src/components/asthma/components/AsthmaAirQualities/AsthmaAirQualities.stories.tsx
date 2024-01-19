import React from 'react';
import AsthmaAirQualities, { AsthmaAirQualitiesProps } from './AsthmaAirQualities';
import { Card, Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaAirQualities',
    component: AsthmaAirQualities,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaAirQualitiesProps) => {
    return <Layout colorScheme="auto">
        <Card>
            <AsthmaAirQualities {...args} />
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        previewState: 'some data (control)'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['neither configured', 'one configured', 'no data (control)', 'no data (date)', 'some data (control)', 'some data (date)', 'all data']
        }
    },
    render: render
};