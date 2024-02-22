import React from 'react';
import AsthmaActionPlanView, { AsthmaActionPlanViewProps } from './AsthmaActionPlanView';

export default {
    title: 'Asthma/Views/AsthmaActionPlanView',
    component: AsthmaActionPlanView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaActionPlanViewProps) => {
    return <AsthmaActionPlanView {...args}/>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded without action plan'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'State',
            control: 'radio',
            options: ['loading', 'loaded without action plan', 'loaded with action plan']
        }
    },
    render: render
};

