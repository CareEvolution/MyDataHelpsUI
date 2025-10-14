import React from 'react';
import { Layout } from '../../../presentational';
import AsthmaProviderReport, { AsthmaProviderReportProps } from './AsthmaProviderReport';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../../.storybook/helpers';

export default {
    title: 'Asthma/Components/AsthmaProviderReport',
    component: AsthmaProviderReport,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaProviderReportProps) => {
        return <Layout colorScheme="light">
            <AsthmaProviderReport {...args} />
        </Layout>;
    }
} as Meta<AsthmaProviderReportProps>;

export const Default: StoryObj<AsthmaProviderReportProps> = {
    args: {
        previewState: 'default'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'default', 'as caregiver']
        },
        ...argTypesToHide(['logEntrySurveyName', 'innerRef'])
    }
};
