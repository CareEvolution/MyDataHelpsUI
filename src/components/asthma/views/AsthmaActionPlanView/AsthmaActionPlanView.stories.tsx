import React from 'react';
import AsthmaActionPlanView, { AsthmaActionPlanViewProps } from './AsthmaActionPlanView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../../.storybook/helpers';

export default {
    title: 'Asthma/Views/AsthmaActionPlanView',
    component: AsthmaActionPlanView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaActionPlanViewProps) => {
        return <AsthmaActionPlanView {...args} />;
    }
} as Meta<AsthmaActionPlanViewProps>;

export const Default: StoryObj<AsthmaActionPlanViewProps> = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded without action plan'
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
            options: ['loading', 'loading (caregiver mode)', 'loaded without action plan', 'loaded without action plan (caregiver mode)', 'loaded with action plan', 'loaded with action plan (caregiver mode)']
        },
        ...argTypesToHide(['learnMoreUrl', 'editActionPlanSurveyName'])
    }
};

