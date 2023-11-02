import React from 'react';
import AsthmaHeartAndLungsView, { AsthmaHeartAndLungsViewProps } from './AsthmaHeartAndLungsView';

export default {
    title: 'Asthma/Views/AsthmaHeartAndLungsView',
    component: AsthmaHeartAndLungsView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaHeartAndLungsViewProps) => <AsthmaHeartAndLungsView {...args} />;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};

