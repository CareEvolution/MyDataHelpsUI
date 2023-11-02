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

export const NoData = {
    args: {
        previewState: 'no-data'
    },
    render: render
};

export const SomeData = {
    args: {
        previewState: 'some-data'
    },
    render: render
};

export const AllData = {
    args: {
        previewState: 'all-data'
    },
    render: render
};

