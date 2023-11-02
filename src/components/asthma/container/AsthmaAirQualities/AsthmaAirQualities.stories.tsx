import React from 'react';
import AsthmaAirQualities, { AsthmaAirQualitiesProps } from './AsthmaAirQualities';
import { Layout } from '../../../presentational';
import Card from '../../../presentational/Card';

export default {
    title: 'Asthma/Container/AsthmaAirQualities',
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
        previewState: 'default'
    },
    render: render
};

