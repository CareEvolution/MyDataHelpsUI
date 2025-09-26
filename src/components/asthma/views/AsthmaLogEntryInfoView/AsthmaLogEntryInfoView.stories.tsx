import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AsthmaLogEntryInfoView, { AsthmaLogEntryInfoViewProps } from './AsthmaLogEntryInfoView';

export default {
    title: 'Asthma/Views/AsthmaLogEntryInfoView',
    component: AsthmaLogEntryInfoView,
    parameters: { layout: 'fullscreen' },
    render: args => <AsthmaLogEntryInfoView {...args} />
} as Meta<AsthmaLogEntryInfoViewProps>;

export const Default: StoryObj<AsthmaLogEntryInfoViewProps> = {
    args: {
        colorScheme: 'auto'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        }
    }
};