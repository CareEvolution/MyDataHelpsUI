import React from 'react';
import GlucoseView, { GlucoseViewProps } from './GlucoseView';

export default {
    title: 'View/GlucoseView',
    component: GlucoseView,
    parameters: { layout: 'fullscreen' }
};

interface GlucoseViewStoryArgs extends GlucoseViewProps {
    state: 'preview' | 'live';
}

const render = (args: GlucoseViewStoryArgs) => {
    return <GlucoseView {...args} previewState={args.state === 'preview' ? 'default' : undefined} />;
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