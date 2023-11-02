import React from 'react';
import AsthmaHeartAndLungsView from './AsthmaHeartAndLungsView';

export default {
    title: 'Asthma/Views/AsthmaHeartAndLungsView',
    component: AsthmaHeartAndLungsView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAirQualityViewStoryProps {
    alert?: '[None]' | 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
}

const render = (args: AsthmaAirQualityViewStoryProps) => <AsthmaHeartAndLungsView previewState="default" alert={args.alert === '[None]' ? undefined : args.alert} logEntrySurveyName="Log Entry Survey Name"/>;

export const Default = {
    args: {
        alert: '[None]'
    },
    argTypes: {
        alert: {
            control: 'radio',
            options: ['[None]', 'DaytimeRestingHeartRate', 'NighttimeRestingHeartRate', 'RespiratoryRate', 'DaytimeBloodOxygenLevel', 'NighttimeBloodOxygenLevel']
        }
    },
    render: render
};

