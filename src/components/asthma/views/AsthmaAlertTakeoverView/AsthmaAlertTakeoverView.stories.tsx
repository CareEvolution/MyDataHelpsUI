import React from 'react';
import AsthmaAlertTakeoverView, { AsthmaAlertTakeoverViewProps } from './AsthmaAlertTakeoverView';

export default {
    title: 'Asthma/Views/AsthmaAlertTakeoverView',
    component: AsthmaAlertTakeoverView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaAlertTakeoverViewProps) => {
    return <AsthmaAlertTakeoverView
        {...args}
        previewState='default'
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

