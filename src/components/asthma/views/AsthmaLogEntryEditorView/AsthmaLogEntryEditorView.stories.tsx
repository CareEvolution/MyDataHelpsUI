import React from 'react';
import AsthmaLogEntryEditorView, { AsthmaLogEntryEditorViewProps } from './AsthmaLogEntryEditorView';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Views/AsthmaLogEntryEditorView',
    component: AsthmaLogEntryEditorView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaLogEntryEditorViewStoryArgs extends AsthmaLogEntryEditorViewProps {
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaLogEntryEditorViewStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <AsthmaLogEntryEditorView {...args} date={new Date()}/>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        previewState: 'no symptoms'
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
            options: ['loading', 'no symptoms', 'mild symptoms', 'moderate symptoms', 'severe symptoms']
        }
    },
    render: render
};