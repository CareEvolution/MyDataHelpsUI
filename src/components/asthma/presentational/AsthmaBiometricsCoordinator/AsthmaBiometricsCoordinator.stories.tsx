import React from 'react';
import { DataItem, Layout } from '../../../presentational';
import AsthmaBiometricsCoordinator, { AsthmaBiometricsCoordinatorProps } from './AsthmaBiometricsCoordinator';

export default {
    title: 'Asthma/Presentational/AsthmaBiometricsCoordinator',
    component: AsthmaBiometricsCoordinator,
    parameters: {layout: 'fullscreen'}
};

let render = (args: AsthmaBiometricsCoordinatorProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
    <AsthmaBiometricsCoordinator {...args}>
        <DataItem dataKey="daytime-resting-heart-rate"/>
    </AsthmaBiometricsCoordinator>
</Layout>;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};
