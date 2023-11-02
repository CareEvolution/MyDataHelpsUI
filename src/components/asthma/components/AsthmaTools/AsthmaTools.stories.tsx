import React from 'react';
import AsthmaTools from './AsthmaTools';
import { Layout } from '../../../presentational';
import Card from '../../../presentational/Card';

export default {
    title: 'Asthma/Components/AsthmaTools',
    component: AsthmaTools,
    parameters: {layout: 'fullscreen'}
};

const render = () => <Layout colorScheme="auto">
    <Card>
        <AsthmaTools previewState="default"/>
    </Card>
</Layout>;

export const Default = {
    render: render
};

