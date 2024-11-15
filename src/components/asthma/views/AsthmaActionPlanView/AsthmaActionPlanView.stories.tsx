import React from 'react';
import AsthmaActionPlanView, { AsthmaActionPlanViewProps } from './AsthmaActionPlanView';

export default {
    title: 'Asthma/Views/AsthmaActionPlanView',
    component: AsthmaActionPlanView,
    parameters: { layout: 'fullscreen' }
};

const render = (args: AsthmaActionPlanViewProps) => {
    return <AsthmaActionPlanView {...args} />;
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
            name: 'state',
            control: 'radio',
            options: ['loading', 'loading (caregiver mode)', 'loaded without action plan', 'loaded without action plan (caregiver mode)', 'loaded with action plan', 'loaded with action plan (caregiver mode)']
        }
    },
    render: render
};

