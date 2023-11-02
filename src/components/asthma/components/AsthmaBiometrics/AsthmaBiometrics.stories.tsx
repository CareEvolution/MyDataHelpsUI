import React from 'react';
import AsthmaBiometrics, { AsthmaBiometricsProps } from './AsthmaBiometrics';
import { Card, Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaBiometrics',
    component: AsthmaBiometrics,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaBiometricsProps) => <Layout colorScheme="auto">
    <Card>
        <AsthmaBiometrics {...args} />
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

