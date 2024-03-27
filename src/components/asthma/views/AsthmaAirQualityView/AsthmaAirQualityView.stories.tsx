import React from 'react';
import AsthmaAirQualityView, { AsthmaAirQualityViewProps } from './AsthmaAirQualityView';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Views/AsthmaAirQualityView',
    component: AsthmaAirQualityView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAirQualityViewStoryArgs extends AsthmaAirQualityViewProps {
    language: 'English' | 'Spanish';
    withAlert: boolean;
    alertType: 'HomeAirQuality' | 'WorkAirQuality';
}

const render = (args: AsthmaAirQualityViewStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <AsthmaAirQualityView
        {...args}
        previewState="default"
        alert={args.withAlert ? args.alertType : undefined}
    />;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        withAlert: false,
        alertType: 'HomeAirQuality'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        language: {
            name: 'language',
            control: 'radio',
            options: ['English', 'Spanish']
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

