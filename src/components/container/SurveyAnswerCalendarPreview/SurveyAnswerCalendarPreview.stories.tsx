import React from 'react';
import { DateRangeCoordinator, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerCalendarPreview from './SurveyAnswerCalendarPreview';

type SurveyAnswerCalendarPreviewStoryArgs = React.ComponentProps<typeof SurveyAnswerCalendarPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

export default {
    title: 'Container/SurveyAnswerCalendarPreview',
    component: SurveyAnswerCalendarPreview,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerCalendarPreviewStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Day">
                <SurveyAnswerCalendarPreview {...args} />
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerCalendarPreviewStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'without log'
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
            options: ['without log', 'with log']
        },
        ...argTypesToHide(['innerRef'])
    }
};
