import React from 'react';
import AsthmaAirQualityView, { AsthmaAirQualityViewProps } from './AsthmaAirQualityView';

export default {
    title: 'Asthma/Views/AsthmaAirQualityView',
    component: AsthmaAirQualityView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAirQualityViewStoryArgs extends AsthmaAirQualityViewProps {
    withAlert: boolean;
    alertType: 'HomeAirQuality' | 'WorkAirQuality';
}

const render = (args: AsthmaAirQualityViewStoryArgs) => {
    return <AsthmaAirQualityView
        {...args}
        previewState="default"
        alert={args.withAlert ? args.alertType : undefined}
    />;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        withAlert: false,
        alertType: 'HomeAirQuality'
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
            options: ['HomeAirQuality', 'WorkAirQuality'],
            if: {arg: 'withAlert', eq: true}
        }
    },
    render: render
};

