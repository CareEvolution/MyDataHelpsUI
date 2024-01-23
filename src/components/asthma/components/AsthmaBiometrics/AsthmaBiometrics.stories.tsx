import React from 'react';
import AsthmaBiometrics, { AsthmaBiometricsProps } from './AsthmaBiometrics';
import { Card, Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaBiometrics',
    component: AsthmaBiometrics,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaBiometricsProps) => {
    return <Layout colorScheme="auto">
        <Card>
            <AsthmaBiometrics {...args} />
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        previewState: 'some data'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['no data', 'some data', 'all data']
        }
    },
    render: render
};

