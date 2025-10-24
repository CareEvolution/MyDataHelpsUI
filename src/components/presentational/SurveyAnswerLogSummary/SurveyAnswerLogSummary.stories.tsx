import React from 'react';
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
};

export default {
    title: 'Presentational/SurveyAnswerLogSummary',
    component: SurveyAnswerLogSummary,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogSummaryStoryArgs) => {
        args.answerRenderingConfigurations = args.showAnswers ? [
            {
                resultIdentifier: 'activity',
                icon: faWalking,
                iconColor: '#3c973c',
                label: 'Activity',
                evaluate: answers => answers[0] !== '0',
                formatDisplayValue: answers => `An activity level of ${answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'sleep',
                icon: faBed,
                iconColor: '#664cda',
                label: 'Sleep',
                evaluate: answers => answers[0] !== '0',
                formatDisplayValue: answers => `A sleep level of ${answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'swimming',
                icon: faSwimmer,
                iconColor: '#976d1e',
                label: 'Swimming',
                evaluate: answers => answers[0] !== '0',
                formatDisplayValue: answers => `A swimming level of ${answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'cycling',
                icon: faBicycle,
                iconColor: '#0877b8',
                label: 'Cycling',
                evaluate: answers => answers[0] !== '0',
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
        showAnswers: true
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
        ...argTypesToHide(['log', 'onEdit', 'answerRenderingConfigurations', 'innerRef'])
    }
};