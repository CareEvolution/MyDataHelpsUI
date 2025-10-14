import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { argTypesToHide } from '../../../../../.storybook/helpers';
import AsthmaProviderReportView, { AsthmaProviderReportViewProps } from './AsthmaProviderReportView';

export default {
    title: 'Asthma/Views/AsthmaProviderReportView',
    component: AsthmaProviderReportView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaProviderReportViewProps) => {
        return <AsthmaProviderReportView {...args} logEntrySurveyName="Log Symptoms - Today" />;
    }
} as Meta<AsthmaProviderReportViewProps>;

export const Default: StoryObj<AsthmaProviderReportViewProps> = {
    args: {
        previewState: 'default'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'default', 'as caregiver']
        },
        ...argTypesToHide(['logEntrySurveyName'])
    }
};

