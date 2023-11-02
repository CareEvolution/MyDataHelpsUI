import React from 'react';
import AsthmaActivityView from './AsthmaActivityView';

export default {
    title: 'Asthma/Views/AsthmaActivityView',
    component: AsthmaActivityView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaActivityViewStoryProps {
    alert?: string;
}

const render = (args: AsthmaActivityViewStoryProps) => <AsthmaActivityView previewState='default' alert={args.alert === '[None]' ? undefined : args.alert}/>;

export const Default = {
    args: {
        alert: '[None]'
    },
    argTypes: {
        alert: {
            control: 'radio',
            options: ['[None]', 'Steps']
        }
    },
    render: render
};

