import React from 'react';
import { DateRangeCoordinator, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogPreview from './SurveyAnswerLogPreview';

type SurveyAnswerLogPreviewStoryArgs = React.ComponentProps<typeof SurveyAnswerLogPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

export default {
    title: 'Container/SurveyAnswerLogPreview',
    component: SurveyAnswerLogPreview,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogPreviewStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Day">
                <SurveyAnswerLogPreview {...args} />
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogPreviewStoryArgs> = {
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
        ...argTypesToHide(['surveyName', 'answerRenderingConfigurations', 'innerRef'])
    }
};
