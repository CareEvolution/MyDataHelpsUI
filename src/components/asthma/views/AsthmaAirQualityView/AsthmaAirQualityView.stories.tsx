import React from 'react';
import AsthmaAirQualityView, { AsthmaAirQualityViewProps } from './AsthmaAirQualityView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../../.storybook/helpers';

interface AsthmaAirQualityViewStoryArgs extends AsthmaAirQualityViewProps {
    withAlert: boolean;
    alertType: 'HomeAirQuality' | 'WorkAirQuality';
}

export default {
    title: 'Asthma/Views/AsthmaAirQualityView',
    component: AsthmaAirQualityView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaAirQualityViewStoryArgs) => {
        return <AsthmaAirQualityView
            {...args}
            previewState="default"
            alert={args.withAlert ? args.alertType : undefined}
        />;
    }
} as Meta<AsthmaAirQualityViewStoryArgs>;

export const Default: StoryObj<AsthmaAirQualityViewStoryArgs> = {
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
            if: { arg: 'withAlert', eq: true }
        },
        ...argTypesToHide(['previewState', 'alert', 'logEntrySurveyName'])
    }
};

