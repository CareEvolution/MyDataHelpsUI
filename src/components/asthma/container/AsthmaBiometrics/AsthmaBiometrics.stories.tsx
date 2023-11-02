import React from 'react';
import AsthmaBiometrics, { AsthmaBiometricsProps } from './AsthmaBiometrics';
import { Layout } from '../../../presentational';
import Card from '../../../presentational/Card';

export default {
    title: 'Asthma/Container/AsthmaBiometrics',
    component: AsthmaBiometrics,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaBiometricsProps) => <Layout colorScheme="auto">
    <Card>
        <AsthmaBiometrics {...args} />
    </Card>
</Layout>;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};

