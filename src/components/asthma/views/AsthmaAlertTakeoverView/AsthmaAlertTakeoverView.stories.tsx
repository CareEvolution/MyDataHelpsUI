import React from 'react';
import AsthmaAlertTakeoverView, { AsthmaAlertTakeoverViewProps } from './AsthmaAlertTakeoverView';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Views/AsthmaAlertTakeoverView',
    component: AsthmaAlertTakeoverView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAlertTakeoverViewStoryArgs extends AsthmaAlertTakeoverViewProps {
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaAlertTakeoverViewStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <AsthmaAlertTakeoverView
        {...args}
        previewState='default'
    />;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English'
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
        }
    },
    render: render
};

