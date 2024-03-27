import React from 'react';
import { Layout } from '../../../presentational';
import AsthmaActionPlanManager, { AsthmaActionPlanManagerProps } from './AsthmaActionPlanManager';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Components/AsthmaActionPlanManager',
    component: AsthmaActionPlanManager,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaActionPlanManagerStoryArgs extends AsthmaActionPlanManagerProps {
    colorScheme: 'auto' | 'light' | 'dark';
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaActionPlanManagerStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <Layout colorScheme={args.colorScheme}>
        <AsthmaActionPlanManager {...args}/>
    </Layout>;
}

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        previewState: 'loaded without action plan'
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
            options: ['loading', 'loaded without action plan', 'loaded with action plan']
        }
    },
    render: render
};
