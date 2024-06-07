import React from 'react';
import GlucoseView, { GlucoseViewProps } from './GlucoseView';

export default {
    title: 'View/GlucoseView',
    component: GlucoseView,
    parameters: {layout: 'fullscreen'}
};

const render = (props: GlucoseViewProps) => {
    return <GlucoseView {...props} previewState="default"/>;
}

export const Default = {
    args: {
        colorScheme: 'auto'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        }
    },
    render: render
};