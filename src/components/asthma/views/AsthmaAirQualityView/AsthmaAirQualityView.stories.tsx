import React from 'react';
import AsthmaAirQualityView from './AsthmaAirQualityView';

export default {
    title: 'Asthma/Views/AsthmaAirQualityView',
    component: AsthmaAirQualityView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAirQualityViewStoryProps {
    alert?: string;
}

const render = (args: AsthmaAirQualityViewStoryProps) => <AsthmaAirQualityView previewState="default" alert={args.alert === '[None]' ? undefined : args.alert} logEntrySurveyName="Log Entry Survey Name"/>;

export const Default = {
    args: {
        alert: '[None]'
    },
    argTypes: {
        alert: {
            control: 'radio',
            options: ['[None]', 'HomeAirQuality', 'WorkAirQuality']
        }
    },
    render: render
};

