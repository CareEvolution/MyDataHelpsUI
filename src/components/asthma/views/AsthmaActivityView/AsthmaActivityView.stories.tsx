import React from 'react';
import AsthmaActivityView, { AsthmaActivityViewProps } from './AsthmaActivityView';

export default {
    title: 'Asthma/Views/AsthmaActivityView',
    component: AsthmaActivityView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaActivityViewStoryArgs extends AsthmaActivityViewProps {
    withAlert: boolean;
}

const render = (args: AsthmaActivityViewStoryArgs) => {
    return <AsthmaActivityView
        {...args}
        previewState='default'
        alert={args.withAlert ? 'Steps' : undefined}
    />;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        withAlert: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        withAlert: {
            name: 'with alert'
        }
    },
    render: render
};

