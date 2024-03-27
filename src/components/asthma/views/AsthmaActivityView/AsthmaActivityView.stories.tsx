import React from 'react';
import AsthmaActivityView, { AsthmaActivityViewProps } from './AsthmaActivityView';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Views/AsthmaActivityView',
    component: AsthmaActivityView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaActivityViewStoryArgs extends AsthmaActivityViewProps {
    language: 'English' | 'Spanish';
    withAlert: boolean;
}

const render = (args: AsthmaActivityViewStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <AsthmaActivityView
        {...args}
        previewState='default'
        alert={args.withAlert ? 'Steps' : undefined}
    />;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        withAlert: false
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
        withAlert: {
            name: 'with alert'
        }
    },
    render: render
};

