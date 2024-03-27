import React from 'react';
import AsthmaSleepView, { AsthmaSleepViewProps } from './AsthmaSleepView';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Views/AsthmaSleepView',
    component: AsthmaSleepView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaSleepViewStoryArgs extends AsthmaSleepViewProps {
    language: 'English' | 'Spanish';
    withAlert: boolean;
}

const render = (args: AsthmaSleepViewStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <AsthmaSleepView
        {...args}
        previewState="default"
        alert={args.withAlert ? 'SleepDisturbances' : undefined}
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

