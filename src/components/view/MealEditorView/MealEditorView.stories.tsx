import React from 'react';
import MealEditorView, { MealEditorViewProps } from './MealEditorView';

export default {
    title: 'View/MealEditorView',
    component: MealEditorView,
    parameters: { layout: 'fullscreen' }
};

const render = (args: MealEditorViewProps) => <MealEditorView {...args} />

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'with existing image'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'preview state',
            control: 'radio',
            options: ['loading', 'without existing image', 'with existing image', 'live']
        }
    },
    render: render
};