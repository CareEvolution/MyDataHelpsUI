import React from 'react';
import AsthmaHeartAndLungsView, { AsthmaHeartAndLungsViewProps } from './AsthmaHeartAndLungsView';

export default {
    title: 'Asthma/Views/AsthmaHeartAndLungsView',
    component: AsthmaHeartAndLungsView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaHeartAndLungsViewStoryArgs extends AsthmaHeartAndLungsViewProps {
    withAlert: boolean;
    alertType: 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
}

const render = (args: AsthmaHeartAndLungsViewStoryArgs) => {
    return <AsthmaHeartAndLungsView
        {...args}
        previewState="default"
        alert={args.withAlert ? args.alertType : undefined}
    />;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        withAlert: false,
        alertType: 'DaytimeRestingHeartRate'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        withAlert: {
            name: 'with alert'
        },
        alertType: {
            name: 'alert type',
            control: 'radio',
            options: ['DaytimeRestingHeartRate', 'NighttimeRestingHeartRate', 'RespiratoryRate', 'DaytimeBloodOxygenLevel', 'NighttimeBloodOxygenLevel'],
            if: {arg: 'withAlert', eq: true}
        }
    },
    render: render
};

