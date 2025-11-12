import React, { CSSProperties } from 'react';
import { Card, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogSummary, { SurveyAnswerRenderingConfiguration } from './SurveyAnswerLogSummary';
import { v4 as uuid } from 'uuid';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { noop } from '../../../helpers/functions';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { startOfToday } from 'date-fns';

type SurveyAnswerLogSummaryStoryArgs = React.ComponentProps<typeof SurveyAnswerLogSummary> & {
    colorScheme: 'auto' | 'light' | 'dark';
    customTitle: boolean;
    customIcons: boolean;
    customIconColors: boolean;
    customLabels: boolean;
    customHighlightEvaluation: boolean;
    customHighlightStyling: boolean;
    customDisplayValues: boolean;
};

export default {
    title: 'Presentational/SurveyAnswerLogSummary',
    component: SurveyAnswerLogSummary,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogSummaryStoryArgs) => {
        const customHighlightStyling: CSSProperties | undefined = args.customHighlightStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'border-radius 0.5s, transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        const answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] = [
            {
                resultIdentifier: 'activity',
                icon: args.customIcons ? faWalking : undefined,
                iconColor: args.customIconColors ? '#3c973c' : undefined,
                label: args.customLabels ? 'Activity' : undefined,
                shouldHighlight: args.customHighlightEvaluation ? surveyAnswer => surveyAnswer.answers[0] !== '0' : undefined,
                customHighlightStyling: args.customHighlightStyling ? customHighlightStyling : undefined,
                formatDisplayValue: args.customDisplayValues ? surveyAnswer => `An activity level of ${surveyAnswer.answers[0]} was recorded on this day.` : undefined
            },
            {
                resultIdentifier: 'sleep',
                icon: args.customIcons ? faBed : undefined,
                iconColor: args.customIconColors ? '#664cda' : undefined,
                label: args.customLabels ? 'Sleep' : undefined,
                shouldHighlight: args.customHighlightEvaluation ? surveyAnswer => surveyAnswer.answers[0] !== '0' : undefined,
                customHighlightStyling: args.customHighlightStyling ? customHighlightStyling : undefined,
                formatDisplayValue: args.customDisplayValues ? surveyAnswer => `A sleep level of ${surveyAnswer.answers[0]} was recorded on this day.` : undefined
            },
            {
                resultIdentifier: 'swimming',
                icon: args.customIcons ? faSwimmer : undefined,
                iconColor: args.customIconColors ? '#0877b8' : undefined,
                label: args.customLabels ? 'Swimming' : undefined,
                shouldHighlight: args.customHighlightEvaluation ? surveyAnswer => surveyAnswer.answers[0] !== '0' : undefined,
                customHighlightStyling: args.customHighlightStyling ? customHighlightStyling : undefined,
                formatDisplayValue: args.customDisplayValues ? surveyAnswer => `A swimming level of ${surveyAnswer.answers[0]} was recorded on this day.` : undefined
            },
            {
                resultIdentifier: 'cycling',
                icon: args.customIcons ? faBicycle : undefined,
                iconColor: args.customIconColors ? '#976d1e' : undefined,
                label: args.customLabels ? 'Cycling' : undefined,
                shouldHighlight: args.customHighlightEvaluation ? surveyAnswer => surveyAnswer.answers[0] !== '0' : undefined,
                customHighlightStyling: args.customHighlightStyling ? customHighlightStyling : undefined,
                formatDisplayValue: args.customDisplayValues ? surveyAnswer => `A cycling level of ${surveyAnswer.answers[0]} was recorded on this day.` : undefined
            }
        ];

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <SurveyAnswerLogSummary
                    {...args}
                    title={args.customTitle ? 'Custom Title' : undefined}
                    answerRenderingConfigurations={answerRenderingConfigurations}
                />
            </Card>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogSummaryStoryArgs> = {
    args: {
        colorScheme: 'auto',
        customTitle: false,
        surveyAnswerLog: {
            resultId: uuid(),
            date: startOfToday(),
            surveyAnswers: [
                { resultIdentifier: 'activity', answers: ['5'] } as SurveyAnswer,
                { resultIdentifier: 'hidden', answers: ['1'] } as SurveyAnswer,
                { resultIdentifier: 'swimming', answers: ['3'] } as SurveyAnswer,
                { resultIdentifier: 'sleep', answers: ['0'] } as SurveyAnswer
            ]
        },
        onEdit: noop,
        alwaysShowAnswerDetails: true,
        showAnswerDetailsOnLoad: true,
        customIcons: true,
        customIconColors: true,
        customLabels: true,
        customDisplayValues: true,
        customHighlightEvaluation: true,
        customHighlightStyling: true,
        loading: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        customTitle: {
            name: 'custom title',
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
        customIcons: {
            name: 'answer custom icons',
            control: 'boolean'
        },
        customIconColors: {
            name: 'answer custom icon colors',
            control: 'boolean'
        },
        customLabels: {
            name: 'answer custom labels',
            control: 'boolean'
        },
        customDisplayValues: {
            name: 'answer custom display values',
            control: 'boolean'
        },
        customHighlightEvaluation: {
            name: 'answer custom highlight evaluation',
            control: 'boolean'
        },
        customHighlightStyling: {
            name: 'answer custom highlight styling',
            control: 'boolean'
        },
        loading: {
            name: 'loading',
            control: 'boolean'
        },
        ...argTypesToHide(['title', 'surveyAnswerLog', 'onEdit', 'answerRenderingConfigurations', 'innerRef'])
    }
};