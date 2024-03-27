import React from 'react';
import AsthmaBiometrics, { AsthmaBiometricsProps } from './AsthmaBiometrics';
import { Card, Layout } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Components/AsthmaBiometrics',
    component: AsthmaBiometrics,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaBiometricsStoryArgs extends AsthmaBiometricsProps {
    colorScheme: 'auto' | 'light' | 'dark';
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaBiometricsStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <AsthmaBiometrics {...args} />
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        previewState: 'some data'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        language: {
            name: 'language',
            control: 'radio',
            options: ['English', 'Spanish']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'no data', 'some data', 'all data']
        }
    },
    render: render
};

