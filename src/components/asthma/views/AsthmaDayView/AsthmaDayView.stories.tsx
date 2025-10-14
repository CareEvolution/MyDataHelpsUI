import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AsthmaDayView, { AsthmaDayViewProps } from './AsthmaDayView';
import { argTypesToHide } from '../../../../../.storybook/helpers';

export default {
    title: 'Asthma/Views/AsthmaDayView',
    component: AsthmaDayView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaDayViewProps) => {
        return <AsthmaDayView {...args} date={new Date()} />;
    }
} as Meta<AsthmaDayViewProps>;

export const Default: StoryObj<AsthmaDayViewProps> = {
    args: {
        colorScheme: 'auto',
        previewState: 'default'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'default', 'as caregiver']
        },
        ...argTypesToHide([
            'date', 'logTodayEntrySurveyName', 'logYesterdayEntrySurveyName', 'editLogEntryUrl', 'logEntryInfoUrl',
            'heartAndLungsUrl', 'activityUrl', 'sleepUrl', 'airQualityUrl'
        ])
    }
};

