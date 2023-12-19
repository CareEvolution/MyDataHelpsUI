import React from 'react';
import AsthmaActivityView, { AsthmaActivityViewProps } from './AsthmaActivityView';

export default {
    title: 'Asthma/Views/AsthmaActivityView',
    component: AsthmaActivityView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaActivityViewProps) => <AsthmaActivityView {...args} />;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};

