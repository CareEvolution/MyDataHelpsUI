import React from 'react';
import AsthmaBiometrics, { AsthmaBiometricsProps } from './AsthmaBiometrics';
import { Card, Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaBiometrics',
    component: AsthmaBiometrics,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaBiometricsStoryArgs extends AsthmaBiometricsProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AsthmaBiometricsStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <AsthmaBiometrics {...args} />
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'some data'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'no data', 'some data', 'all data']
        }
    },
    render: render
};

