import React from 'react';
import AsthmaHeartAndLungsView from './AsthmaHeartAndLungsView';

export default {
    title: 'Asthma/Views/AsthmaHeartAndLungsView',
    component: AsthmaHeartAndLungsView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAirQualityViewStoryProps {
    alert?: string;
}

const render = (args: AsthmaAirQualityViewStoryProps) => <AsthmaHeartAndLungsView previewState="default" alert={args.alert === '[None]' ? undefined : args.alert}/>;

export const Default = {
    args: {
        alert: '[None]'
    },
    argTypes: {
        alert: {
            control: 'radio',
            options: ['[None]', 'DaytimeRestingHeartRate', 'NighttimeRestingHeartRate', 'RespiratoryRate', 'BloodOxygen']
        }
    },
    render: render
};

