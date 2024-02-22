import React from 'react';
import AsthmaLogEntryEditorView, { AsthmaLogEntryEditorViewProps } from './AsthmaLogEntryEditorView';

export default {
    title: 'Asthma/Views/AsthmaLogEntryEditorView',
    component: AsthmaLogEntryEditorView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLogEntryEditorViewProps) => {
    return <AsthmaLogEntryEditorView {...args} date={new Date()}/>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'no symptoms'
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
            options: ['loading', 'no symptoms', 'mild symptoms', 'moderate symptoms', 'severe symptoms']
        }
    },
    render: render
};