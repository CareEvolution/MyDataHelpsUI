import React from 'react';
import AsthmaDayView, { AsthmaDayViewProps } from './AsthmaDayView';

export default {
    title: 'Asthma/Views/AsthmaDayView',
    component: AsthmaDayView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaDayViewProps) => {
    return <AsthmaDayView
        {...args}
        previewState="default"
        date={new Date()}
    />;
};

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

