import React, { CSSProperties } from 'react';
import { Card, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogSummary from './SurveyAnswerLogSummary';
import { v4 as uuid } from 'uuid';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { noop } from '../../../helpers/functions';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { SurveyAnswerRenderingConfiguration } from '../../../helpers';

type SurveyAnswerLogSummaryStoryArgs = React.ComponentProps<typeof SurveyAnswerLogSummary> & {
    colorScheme: 'auto' | 'light' | 'dark';
    showAnswers: boolean;
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
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        const answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined = args.showAnswers ? [
            {
                resultIdentifier: 'activity',
                icon: args.customIcons ? faWalking : undefined,
                iconColor: args.customIconColors ? '#3c973c' : undefined,
                label: args.customLabels ? 'Activity' : undefined,
                shouldHighlight: args.customHighlightEvaluation ? answer => answer.answers[0] !== '0' : undefined,
                customHighlightStyling: args.customHighlightStyling ? customHighlightStyling : undefined,
                formatDisplayValue: args.customDisplayValues ? answer => `An activity level of ${answer.answers[0]} was recorded on this day.` : undefined
            },
            {
                resultIdentifier: 'sleep',
                icon: args.customIcons ? faBed : undefined,
                iconColor: args.customIconColors ? '#664cda' : undefined,
                label: args.customLabels ? 'Sleep' : undefined,
                shouldHighlight: args.customHighlightEvaluation ? answer => answer.answers[0] !== '0' : undefined,
                customHighlightStyling: args.customHighlightStyling ? customHighlightStyling : undefined,
                formatDisplayValue: args.customDisplayValues ? answer => `A sleep level of ${answer.answers[0]} was recorded on this day.` : undefined
            },
            {
                resultIdentifier: 'swimming',
                icon: args.customIcons ? faSwimmer : undefined,
                iconColor: args.customIconColors ? '#976d1e' : undefined,
                label: args.customLabels ? 'Swimming' : undefined,
                shouldHighlight: args.customHighlightEvaluation ? answer => answer.answers[0] !== '0' : undefined,
                customHighlightStyling: args.customHighlightStyling ? customHighlightStyling : undefined,
                formatDisplayValue: args.customDisplayValues ? answer => `A swimming level of ${answer.answers[0]} was recorded on this day.` : undefined
            },
            {
                resultIdentifier: 'cycling',
                icon: args.customIcons ? faBicycle : undefined,
                iconColor: args.customIconColors ? '#0877b8' : undefined,
                label: args.customLabels ? 'Cycling' : undefined,
                shouldHighlight: args.customHighlightEvaluation ? answer => answer.answers[0] !== '0' : undefined,
                customHighlightStyling: args.customHighlightStyling ? customHighlightStyling : undefined,
                formatDisplayValue: args.customDisplayValues ? answer => `A cycling level of ${answer.answers[0]} was recorded on this day.` : undefined
            }
        ] : undefined;

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <SurveyAnswerLogSummary
                    {...args}
                    answerRenderingConfigurations={answerRenderingConfigurations}
                />
            </Card>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogSummaryStoryArgs> = {
    args: {
        colorScheme: 'auto',
        log: {
            resultId: uuid(),
            surveyAnswers: [
                { resultIdentifier: 'activity', answers: ['5'] } as SurveyAnswer,
                { resultIdentifier: 'hidden', answers: ['1'] } as SurveyAnswer,
                { resultIdentifier: 'swimming', answers: ['3'] } as SurveyAnswer,
                { resultIdentifier: 'sleep', answers: ['0'] } as SurveyAnswer
            ]
        },
        onEdit: noop,
        showAnswers: true,
        alwaysShowAnswerDetails: true,
        showAnswerDetailsOnLoad: true,
        customIcons: true,
        customIconColors: true,
        customLabels: true,
        customDisplayValues: true,
        customHighlightEvaluation: true,
        customHighlightStyling: true
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        showAnswers: {
            name: 'render answers',
            control: 'boolean'
        },
        alwaysShowAnswerDetails: {
            name: 'always show answer details',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        showAnswerDetailsOnLoad: {
            name: 'show answer details on load',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        customIcons: {
            name: 'custom icons',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        customIconColors: {
            name: 'custom icon colors',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        customLabels: {
            name: 'custom labels',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        customDisplayValues: {
            name: 'custom display values',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        customHighlightEvaluation: {
            name: 'custom highlight evaluation',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        customHighlightStyling: {
            name: 'custom highlight styling',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        ...argTypesToHide(['log', 'onEdit', 'answerRenderingConfigurations', 'innerRef'])
    }
};