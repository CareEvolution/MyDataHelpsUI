import React from 'react';
import AsthmaAlertTakeoverView from './AsthmaAlertTakeoverView';

export default {
    title: 'Asthma/Views/AsthmaAlertTakeoverView',
    component: AsthmaAlertTakeoverView,
    parameters: {layout: 'fullscreen'}
};

const render = () => <AsthmaAlertTakeoverView previewState='default'/>;

export const Default = {
    render: render
};

