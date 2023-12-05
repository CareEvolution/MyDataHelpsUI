import React from 'react';
import { Layout, DataItem } from '../../../presentational';
import AsthmaBiometricsCoordinator, { AsthmaBiometricsCoordinatorProps } from './AsthmaBiometricsCoordinator';

export default {
    title: 'Asthma/Presentational/AsthmaBiometricsCoordinator',
    component: AsthmaBiometricsCoordinator,
    parameters: {layout: 'fullscreen'}
};

let render = (args: AsthmaBiometricsCoordinatorProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
    <AsthmaBiometricsCoordinator {...args}>
        <DataItem dataKey="preview"/>
    </AsthmaBiometricsCoordinator>
</Layout>;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};
