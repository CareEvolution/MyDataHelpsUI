import React, { CSSProperties } from 'react';
import { Card, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogSummary from './SurveyAnswerLogSummary';
import { v4 as uuid } from 'uuid';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { noop } from '../../../helpers/functions';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';

type SurveyAnswerLogSummaryStoryArgs = React.ComponentProps<typeof SurveyAnswerLogSummary> & {
    colorScheme: 'auto' | 'light' | 'dark';
    showAnswers: boolean;
    customAchievedStyling: boolean;
};

export default {
    title: 'Presentational/SurveyAnswerLogSummary',
    component: SurveyAnswerLogSummary,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogSummaryStoryArgs) => {
        const achievedStyling: CSSProperties | undefined = args.customAchievedStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        args.answerRenderingConfigurations = args.showAnswers ? [
            {
                resultIdentifier: 'activity',
                icon: faWalking,
                iconColor: '#3c973c',
                label: 'Activity',
                evaluate: answers => answers[0] !== '0',
                achievedStyling: achievedStyling,
                formatDisplayValue: answers => `An activity level of ${answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'sleep',
                icon: faBed,
                iconColor: '#664cda',
                label: 'Sleep',
                evaluate: answers => answers[0] !== '0',
                achievedStyling: achievedStyling,
                formatDisplayValue: answers => `A sleep level of ${answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'swimming',
                icon: faSwimmer,
                iconColor: '#976d1e',
                label: 'Swimming',
                evaluate: answers => answers[0] !== '0',
                achievedStyling: achievedStyling,
                formatDisplayValue: answers => `A swimming level of ${answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'cycling',
                icon: faBicycle,
                iconColor: '#0877b8',
                label: 'Cycling',
                evaluate: answers => answers[0] !== '0',
                achievedStyling: achievedStyling,
                formatDisplayValue: answers => `A cycling level of ${answers[0]} was recorded on this day.`
            }
        ] : undefined;

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <SurveyAnswerLogSummary {...args} />
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
        customAchievedStyling: false
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
        customAchievedStyling: {
            name: 'custom achieved styling',
            control: 'boolean',
            if: { arg: 'showAnswers', eq: true }
        },
        ...argTypesToHide(['log', 'onEdit', 'answerRenderingConfigurations', 'innerRef'])
    }
};