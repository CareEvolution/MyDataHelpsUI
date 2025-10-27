import React from 'react';
import { DateRangeCoordinator, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogPreview from './SurveyAnswerLogPreview';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';

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
        previewState: 'without log',
        answerRenderingConfigurations: [
            {
                resultIdentifier: 'activity',
                icon: faWalking,
                iconColor: '#3c973c',
                label: 'Activity',
                formatDisplayValue: () => 'custom display value'
            },
            {
                resultIdentifier: 'sleep',
                icon: faBed,
                iconColor: '#664cda',
                label: 'Sleep',
                shouldHighlight: answer => answer.answers[0] !== '0'
            },
            {
                resultIdentifier: 'swimming',
                icon: faSwimmer,
                iconColor: '#976d1e',
                label: 'Swimming',
                shouldHighlight: answer => answer.answers[0] !== '0',
                formatDisplayValue: () => 'custom display value'
            },
            {
                resultIdentifier: 'cycling',
                icon: faBicycle,
                iconColor: '#0877b8',
                label: 'Cycling',
                shouldHighlight: answer => answer.answers[0] !== '0',
                formatDisplayValue: () => 'custom display value'
            }
        ],
        alwaysShowAnswerDetails: true,
        showAnswerDetailsOnLoad: true
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
        alwaysShowAnswerDetails: {
            name: 'always show answer details',
            control: 'boolean'
        },
        showAnswerDetailsOnLoad: {
            name: 'show answer details on load',
            control: 'boolean'
        },
        ...argTypesToHide(['surveyName', 'answerRenderingConfigurations', 'innerRef'])
    }
};
