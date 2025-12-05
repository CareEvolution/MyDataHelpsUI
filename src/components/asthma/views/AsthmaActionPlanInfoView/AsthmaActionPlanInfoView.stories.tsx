import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AsthmaActionPlanInfoView, { AsthmaActionPlanInfoViewProps } from './AsthmaActionPlanInfoView';
import { argTypesToHide } from '../../../../../.storybook/helpers';

export default {
    title: 'Asthma/Views/AsthmaActionPlanInfoView',
    component: AsthmaActionPlanInfoView,
    parameters: { layout: 'fullscreen' },
    render: args => <AsthmaActionPlanInfoView {...args} libraryBaseUrl="https://asthma.careevolutionapps.com/library/" />
} as Meta<AsthmaActionPlanInfoViewProps>;

export const Default: StoryObj<AsthmaActionPlanInfoViewProps> = {
    args: {
        colorScheme: 'auto'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        ...argTypesToHide(['libraryBaseUrl'])
    }
};