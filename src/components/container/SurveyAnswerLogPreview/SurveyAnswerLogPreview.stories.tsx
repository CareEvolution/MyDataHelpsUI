import React, { CSSProperties, ReactNode } from 'react';
import { DateRangeCoordinator, Layout, SurveyAnswerLogBadgeConfiguration } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogPreview from './SurveyAnswerLogPreview';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';

type SurveyAnswerLogPreviewStoryArgs = React.ComponentProps<typeof SurveyAnswerLogPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
    customStyling: boolean;
    badgeDetails: boolean;
};

export default {
    title: 'Container/SurveyAnswerLogPreview',
    component: SurveyAnswerLogPreview,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogPreviewStoryArgs) => {
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

        const badgeConfigurations: SurveyAnswerLogBadgeConfiguration[] | undefined = args.badgeDetails ? [
            {
                identifier: 'activity',
                shouldHighlight: surveyAnswers => shouldHighlight(surveyAnswers, 'activity'),
                customHighlightStyling: customHighlightStyling,
                getBadgeDetails: surveyAnswers => getBadgeDetails(surveyAnswers, 'Activity', 'activity'),
                icon: faWalking,
                iconColor: '#3c973c'
            },
            {
                identifier: 'sleep',
                shouldHighlight: surveyAnswers => shouldHighlight(surveyAnswers, 'sleep'),
                customHighlightStyling: customHighlightStyling,
                getBadgeDetails: surveyAnswers => getBadgeDetails(surveyAnswers, 'Sleep', 'sleep'),
                icon: faBed,
                iconColor: '#664cda'
            },
            {
                identifier: 'swimming',
                shouldHighlight: surveyAnswers => shouldHighlight(surveyAnswers, 'swimming'),
                customHighlightStyling: customHighlightStyling,
                getBadgeDetails: surveyAnswers => getBadgeDetails(surveyAnswers, 'Swimming', 'swimming'),
                icon: faSwimmer,
                iconColor: '#0877b8'
            },
            {
                identifier: 'cycling',
                shouldHighlight: surveyAnswers => shouldHighlight(surveyAnswers, 'cycling'),
                customHighlightStyling: customHighlightStyling,
                getBadgeDetails: surveyAnswers => getBadgeDetails(surveyAnswers, 'Cycling', 'cycling'),
                icon: faBicycle,
                iconColor: '#976d1e'
            }
        ] : undefined;

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Day">
                <SurveyAnswerLogPreview {...args} badgeConfigurations={badgeConfigurations} />
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogPreviewStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'without log',
        customStyling: true,
        badgeDetails: true,
        showFirstBadgeDetailsOnLoad: true,
        alwaysShowBadgeDetails: false
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
            options: ['loading', 'without log', 'reloading without log', 'with log', 'reloading with log']
        },
        badgeDetails: {
            name: 'display badge details',
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
        ...argTypesToHide(['surveyName', 'badgeConfigurations', 'innerRef'])
    }
};
