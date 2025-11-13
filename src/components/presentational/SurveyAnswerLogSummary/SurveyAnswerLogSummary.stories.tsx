import React, { CSSProperties, ReactNode } from 'react';
import { Card, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogSummary, { SurveyAnswerLogBadgeConfiguration } from './SurveyAnswerLogSummary';
import { v4 as uuid } from 'uuid';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { noop } from '../../../helpers/functions';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { startOfToday } from 'date-fns';

type SurveyAnswerLogSummaryStoryArgs = React.ComponentProps<typeof SurveyAnswerLogSummary> & {
    colorScheme: 'auto' | 'light' | 'dark';
    customTitle: boolean;
    customStyling: boolean;
    badgeDetails: boolean;
    customIcons: boolean;
    customIconColors: boolean;
};

export default {
    title: 'Presentational/SurveyAnswerLogSummary',
    component: SurveyAnswerLogSummary,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogSummaryStoryArgs) => {
        const customHighlightStyling: CSSProperties | undefined = args.customStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'border-radius 0.5s, transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        const shouldHighlight = (surveyAnswers: SurveyAnswer[], resultIdentifier: string): boolean => {
            const surveyAnswer = surveyAnswers.find(sa => sa.resultIdentifier === resultIdentifier);
            return !!surveyAnswer && surveyAnswer.answers[0] !== '0';
        };

        const getBadgeDetails = (surveyAnswers: SurveyAnswer[], label: string, resultIdentifier: string): NonNullable<ReactNode> => {
            const surveyAnswer = surveyAnswers.find(sa => sa.resultIdentifier === resultIdentifier);
            return <>
                <div style={{ fontWeight: 'bold' }}>{label}</div>
                <div style={{ marginTop: '4px', color: 'var(--mdhui-text-color-2)', fontSize: '0.9em' }}>
                    {surveyAnswer && `A value of ${surveyAnswer.answers[0]} was recorded for ${resultIdentifier} for this day.`}
                    {!surveyAnswer && `No value was recorded for ${resultIdentifier} for this day.`}
                </div>
            </>;
        };

        const badgeConfigurations: SurveyAnswerLogBadgeConfiguration[] = [
            {
                identifier: 'activity',
                shouldHighlight: surveyAnswers => shouldHighlight(surveyAnswers, 'activity'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                getBadgeDetails: args.badgeDetails ? surveyAnswers => getBadgeDetails(surveyAnswers, 'Activity', 'activity') : undefined,
                icon: args.customIcons ? faWalking : undefined,
                iconColor: args.customIconColors ? '#3c973c' : undefined
            },
            {
                identifier: 'sleep',
                shouldHighlight: surveyAnswers => shouldHighlight(surveyAnswers, 'sleep'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                getBadgeDetails: args.badgeDetails ? surveyAnswers => getBadgeDetails(surveyAnswers, 'Sleep', 'sleep') : undefined,
                icon: args.customIcons ? faBed : undefined,
                iconColor: args.customIconColors ? '#664cda' : undefined
            },
            {
                identifier: 'swimming',
                shouldHighlight: surveyAnswers => shouldHighlight(surveyAnswers, 'swimming'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                getBadgeDetails: args.badgeDetails ? surveyAnswers => getBadgeDetails(surveyAnswers, 'Swimming', 'swimming') : undefined,
                icon: args.customIcons ? faSwimmer : undefined,
                iconColor: args.customIconColors ? '#0877b8' : undefined
            },
            {
                identifier: 'cycling',
                shouldHighlight: surveyAnswers => shouldHighlight(surveyAnswers, 'cycling'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                getBadgeDetails: args.badgeDetails ? surveyAnswers => getBadgeDetails(surveyAnswers, 'Cycling', 'cycling') : undefined,
                icon: args.customIcons ? faBicycle : undefined,
                iconColor: args.customIconColors ? '#976d1e' : undefined
            }
        ];

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <SurveyAnswerLogSummary
                    {...args}
                    title={args.customTitle ? 'Custom Title' : undefined}
                    surveyAnswerLog={{
                        resultId: uuid(),
                        date: startOfToday(),
                        surveyAnswers: [
                            { resultIdentifier: 'activity', answers: ['5'] } as SurveyAnswer,
                            { resultIdentifier: 'hidden', answers: ['1'] } as SurveyAnswer,
                            { resultIdentifier: 'swimming', answers: ['3'] } as SurveyAnswer,
                            { resultIdentifier: 'sleep', answers: ['0'] } as SurveyAnswer
                        ]
                    }}
                    onEdit={noop}
                    badgeConfigurations={badgeConfigurations}
                />
            </Card>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogSummaryStoryArgs> = {
    args: {
        colorScheme: 'auto',
        customTitle: false,
        customStyling: true,
        badgeDetails: true,
        showFirstBadgeDetailsOnLoad: true,
        alwaysShowBadgeDetails: true,
        customIcons: true,
        customIconColors: true,
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
        customStyling: {
            name: 'custom styling',
            control: 'boolean'
        },
        badgeDetails: {
            name: 'with badge details',
            control: 'boolean'
        },
        showFirstBadgeDetailsOnLoad: {
            name: 'show first badge details on load',
            control: 'boolean'
        },
        alwaysShowBadgeDetails: {
            name: 'always show badge details',
            control: 'boolean'
        },
        customIcons: {
            name: 'custom icons',
            control: 'boolean'
        },
        customIconColors: {
            name: 'custom icon colors',
            control: 'boolean'
        },
        loading: {
            name: 'loading',
            control: 'boolean'
        },
        ...argTypesToHide(['title', 'surveyAnswerLog', 'onEdit', 'badgeConfigurations', 'innerRef'])
    }
};