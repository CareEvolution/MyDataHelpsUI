import React from 'react';
import AsthmaActivityView, { AsthmaActivityViewProps } from './AsthmaActivityView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../../.storybook/helpers';

interface AsthmaActivityViewStoryArgs extends AsthmaActivityViewProps {
    withAlert: boolean;
}

export default {
    title: 'Asthma/Views/AsthmaActivityView',
    component: AsthmaActivityView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaActivityViewStoryArgs) => {
        return <AsthmaActivityView
            {...args}
            previewState="default"
            alert={args.withAlert ? 'Steps' : undefined}
        />;
    }
} as Meta<AsthmaActivityViewStoryArgs>;

export const Default: StoryObj<AsthmaActivityViewStoryArgs> = {
    args: {
        colorScheme: 'auto',
        withAlert: false
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
        ...argTypesToHide(['previewState', 'alert', 'logEntrySurveyName'])
    }
};

