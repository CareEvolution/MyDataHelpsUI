import React from 'react';
import MealEditorView, { MealEditorViewProps } from './MealEditorView';

export default {
    title: 'View/MealEditorView',
    component: MealEditorView,
    parameters: { layout: 'fullscreen' }
};

interface MealEditorViewStoryArgs extends MealEditorViewProps {
    state: 'preview' | 'live';
}

const render = (args: MealEditorViewStoryArgs) => {
    return <MealEditorView {...args} previewState={args.state === 'preview' ? 'default' : undefined} />;
}

export const Default = {
    args: {
        colorScheme: 'auto',
        state: 'preview'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        state: {
            name: 'state',
            control: 'radio',
            options: ['preview', 'live']
        }
    },
    render: render
};