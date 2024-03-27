import React from 'react';
import AsthmaDayView, { AsthmaDayViewProps } from './AsthmaDayView';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Views/AsthmaDayView',
    component: AsthmaDayView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaDayViewStoryArgs extends AsthmaDayViewProps {
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaDayViewStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <AsthmaDayView
        {...args}
        previewState="default"
        date={new Date()}
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

