import React from 'react';
import { Card, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogSummary from './SurveyAnswerLogSummary';
import { v4 as uuid } from 'uuid';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { alwaysTrueSurveyAnswerFilter, asIsSurveyAnswerFormatter } from '../../../helpers/survey-answer';
import { noop } from '../../../helpers/functions';

type SurveyAnswerLogSummaryStoryArgs = React.ComponentProps<typeof SurveyAnswerLogSummary> & {
    colorScheme: 'auto' | 'light' | 'dark';
    filterAnswers: boolean;
    formatAnswers: boolean;
};

export default {
    title: 'Presentational/SurveyAnswerLogSummary',
    component: SurveyAnswerLogSummary,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogSummaryStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <SurveyAnswerLogSummary
                    {...args}
                    filter={args.filterAnswers
                        ? surveyAnswer => surveyAnswer.resultIdentifier !== 'filterable'
                        : alwaysTrueSurveyAnswerFilter
                    }
                    formatter={args.formatAnswers
                        ? surveyAnswer => {
                            const displayName = surveyAnswer.resultIdentifier.charAt(0).toUpperCase() + surveyAnswer.resultIdentifier.slice(1);
                            const displayValue = surveyAnswer.answers[0] === '1' ? 'Yes' : 'No';
                            return { sortIndex: 0, displayName, displayValue };
                        }
                        : asIsSurveyAnswerFormatter
                    }
                />
            </Card>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogSummaryStoryArgs> = {
    args: {
        colorScheme: 'auto',
        surveyAnswerLog: {
            resultId: uuid(),
            surveyAnswers: [
                { resultIdentifier: 'activity', answers: ['1'] } as SurveyAnswer,
                { resultIdentifier: 'filterable', answers: ['0'] } as SurveyAnswer,
                { resultIdentifier: 'sleep', answers: ['0'] } as SurveyAnswer
            ]
        },
        filterAnswers: true,
        formatAnswers: true,
        onEnterLog: noop
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        filterAnswers: {
            name: 'filter answers',
            control: 'boolean'
        },
        formatAnswers: {
            name: 'format answers',
            control: 'boolean'
        },
        ...argTypesToHide(['surveyAnswerLog', 'onEnterLog', 'filter', 'formatter', 'innerRef'])
    }
};
