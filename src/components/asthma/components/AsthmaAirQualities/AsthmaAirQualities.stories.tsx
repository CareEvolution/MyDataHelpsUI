import React from 'react';
import AsthmaAirQualities, { AsthmaAirQualitiesProps } from './AsthmaAirQualities';
import { Card, Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaAirQualities',
    component: AsthmaAirQualities,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaAirQualitiesProps) => <Layout colorScheme="auto">
    <Card>
        <AsthmaAirQualities {...args} />
    </Card>
</Layout>;

export const Default = {
    args: {
        previewState: 'some data'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['not configured', 'some configured', 'no data', 'some data', 'all data']
        }
    },
    render: render
};