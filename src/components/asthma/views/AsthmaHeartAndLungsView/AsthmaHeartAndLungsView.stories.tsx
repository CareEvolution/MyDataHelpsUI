import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AsthmaHeartAndLungsView, { AsthmaHeartAndLungsViewProps } from './AsthmaHeartAndLungsView';
import { argTypesToHide } from '../../../../../.storybook/helpers';

interface AsthmaHeartAndLungsViewStoryArgs extends AsthmaHeartAndLungsViewProps {
    withAlert: boolean;
    alertType: 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
}

export default {
    title: 'Asthma/Views/AsthmaHeartAndLungsView',
    component: AsthmaHeartAndLungsView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaHeartAndLungsViewStoryArgs) => {
        return <AsthmaHeartAndLungsView
            {...args}
            previewState="default"
            alert={args.withAlert ? args.alertType : undefined}
        />;
    }
} as Meta<AsthmaHeartAndLungsViewStoryArgs>;

export const Default: StoryObj<AsthmaHeartAndLungsViewStoryArgs> = {
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
            if: { arg: 'withAlert', eq: true }
        },
        ...argTypesToHide(['previewState', 'alert', 'logEntrySurveyName'])
    }
};

