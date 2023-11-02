import React from 'react';
import AsthmaDataView, { AsthmaDataViewProps } from './AsthmaDataView';

export default {
    title: 'Asthma/Views/AsthmaDataView',
    component: AsthmaDataView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaDataViewProps) => <AsthmaDataView {...args} />;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};

