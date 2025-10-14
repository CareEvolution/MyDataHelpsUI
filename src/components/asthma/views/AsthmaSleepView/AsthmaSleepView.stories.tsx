import React from 'react';
import AsthmaSleepView, { AsthmaSleepViewProps } from './AsthmaSleepView';
import { argTypesToHide } from '../../../../../.storybook/helpers';
import { Meta, StoryObj } from '@storybook/react';

interface AsthmaSleepViewStoryArgs extends AsthmaSleepViewProps {
    withAlert: boolean;
}

export default {
    title: 'Asthma/Views/AsthmaSleepView',
    component: AsthmaSleepView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaSleepViewStoryArgs) => {
        return <AsthmaSleepView
            {...args}
            previewState="default"
            alert={args.withAlert ? 'SleepDisturbances' : undefined}
        />;
    }
} as Meta<AsthmaSleepViewStoryArgs>;

export const Default: StoryObj<AsthmaSleepViewStoryArgs> = {
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

