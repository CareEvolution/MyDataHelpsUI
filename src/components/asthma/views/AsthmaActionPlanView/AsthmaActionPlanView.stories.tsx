import React from 'react';
import AsthmaActionPlanView, { AsthmaActionPlanViewProps } from './AsthmaActionPlanView';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Views/AsthmaActionPlanView',
    component: AsthmaActionPlanView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaActionPlanViewStoryArgs extends AsthmaActionPlanViewProps {
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaActionPlanViewStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <AsthmaActionPlanView {...args}/>;
};

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
            name: 'State',
            control: 'radio',
            options: ['loading', 'loaded without action plan', 'loaded with action plan']
        }
    },
    render: render
};

