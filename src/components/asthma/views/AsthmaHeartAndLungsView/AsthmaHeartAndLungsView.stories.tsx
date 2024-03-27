import React from 'react';
import AsthmaHeartAndLungsView, { AsthmaHeartAndLungsViewProps } from './AsthmaHeartAndLungsView';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Views/AsthmaHeartAndLungsView',
    component: AsthmaHeartAndLungsView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaHeartAndLungsViewStoryArgs extends AsthmaHeartAndLungsViewProps {
    language: 'English' | 'Spanish';
    withAlert: boolean;
    alertType: 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
}

const render = (args: AsthmaHeartAndLungsViewStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <AsthmaHeartAndLungsView
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
        alertType: 'DaytimeRestingHeartRate'
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
            options: ['DaytimeRestingHeartRate', 'NighttimeRestingHeartRate', 'RespiratoryRate', 'DaytimeBloodOxygenLevel', 'NighttimeBloodOxygenLevel'],
            if: {arg: 'withAlert', eq: true}
        }
    },
    render: render
};

