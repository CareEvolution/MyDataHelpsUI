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

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};

