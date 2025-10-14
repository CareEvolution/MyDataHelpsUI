import React from 'react';
import AsthmaAlertTakeoverView, { AsthmaAlertTakeoverViewProps } from './AsthmaAlertTakeoverView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../../.storybook/helpers';

export default {
    title: 'Asthma/Views/AsthmaAlertTakeoverView',
    component: AsthmaAlertTakeoverView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaAlertTakeoverViewProps) => {
        return <AsthmaAlertTakeoverView
            {...args}
            previewState="default"
        />;
    }
} as Meta<AsthmaAlertTakeoverViewProps>;

export const Default: StoryObj<AsthmaAlertTakeoverViewProps> = {
    args: {
        colorScheme: 'auto'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        ...argTypesToHide(['previewState', 'logEntrySurveyName'])
    }
};

