import React, { CSSProperties } from 'react';
import { DateRangeCoordinator, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogPreview from './SurveyAnswerLogPreview';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { SurveyAnswerRenderingConfiguration } from '../../../helpers';

const customHighlightStyling: CSSProperties = {
    boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'border-radius: 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease'
};

type SurveyAnswerLogPreviewStoryArgs = React.ComponentProps<typeof SurveyAnswerLogPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
    showAnswers: boolean;
};

export default {
    title: 'Container/SurveyAnswerLogPreview',
    component: SurveyAnswerLogPreview,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogPreviewStoryArgs) => {
        const answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined = args.showAnswers ? [
            {
                resultIdentifier: 'activity',
                icon: faWalking,
                iconColor: '#3c973c',
                label: 'Activity',
                shouldHighlight: surveyAnswer => surveyAnswer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: surveyAnswer => `An activity level of ${surveyAnswer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'sleep',
                icon: faBed,
                iconColor: '#664cda',
                label: 'Sleep',
                shouldHighlight: surveyAnswer => surveyAnswer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: surveyAnswer => `A sleep level of ${surveyAnswer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'swimming',
                icon: faSwimmer,
                iconColor: '#976d1e',
                label: 'Swimming',
                shouldHighlight: surveyAnswer => surveyAnswer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: surveyAnswer => `A swimming level of ${surveyAnswer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'cycling',
                icon: faBicycle,
                iconColor: '#0877b8',
                label: 'Cycling',
                shouldHighlight: surveyAnswer => surveyAnswer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: surveyAnswer => `A cycling level of ${surveyAnswer.answers[0]} was recorded on this day.`
            }
        ] : undefined;

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Day">
                <SurveyAnswerLogPreview {...args} answerRenderingConfigurations={answerRenderingConfigurations} />
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogPreviewStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'without log',
        showAnswers: true,
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
        showAnswers: {
            name: 'show answers',
            control: 'boolean'
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
