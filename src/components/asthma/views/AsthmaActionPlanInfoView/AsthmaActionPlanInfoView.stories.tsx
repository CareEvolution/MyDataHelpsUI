import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AsthmaActionPlanInfoView, { AsthmaActionPlanInfoViewProps } from './AsthmaActionPlanInfoView';

export default {
    title: 'Asthma/Views/AsthmaActionPlanInfoView',
    component: AsthmaActionPlanInfoView,
    parameters: { layout: 'fullscreen' },
    render: args => <AsthmaActionPlanInfoView {...args} />
} as Meta<AsthmaActionPlanInfoViewProps>;

export const Default: StoryObj<AsthmaActionPlanInfoViewProps> = {
    args: {
        colorScheme: 'auto',
        libraryBaseUrl: 'https://asthma.careevolutionapps.com/library/'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        }
    }
};