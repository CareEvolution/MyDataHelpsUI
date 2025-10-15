import React, { CSSProperties, ReactNode } from 'react';
import { Card, Layout, SurveyLogBadgeConfiguration, SurveyLogBadgeCoordinator } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyLogSummary from './SurveyLogSummary';
import { noop } from '../../../helpers/functions';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { startOfToday } from 'date-fns';
import { SurveyLog, SurveyLogSurveyAnswer } from '../../../helpers';

type SurveyLogSummaryStoryArgs = React.ComponentProps<typeof SurveyLogSummary> & {
    colorScheme: 'auto' | 'light' | 'dark';
    customTitle: boolean;
    customStyling: boolean;
    badges: boolean;
    badgeDetails: boolean;
    showFirstBadgeDetailsOnLoad: boolean,
    alwaysShowBadgeDetails: boolean,
    customIcons: boolean;
    customIconColors: boolean;
};

export default {
    title: 'Presentational/SurveyLogSummary',
    component: SurveyLogSummary,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyLogSummaryStoryArgs) => {
        const customHighlightStyling: CSSProperties | undefined = args.customStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'border-radius 0.5s, transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        const shouldHighlight = (surveyLog: SurveyLog, resultIdentifier: string): boolean => {
            const surveyAnswer = surveyLog.surveyAnswers.find(surveyAnswer => surveyAnswer.resultIdentifier === resultIdentifier);
            return !!surveyAnswer && surveyAnswer.answers[0] !== '0';
        };

        const getBadgeDetails = (surveyLog: SurveyLog, label: string, resultIdentifier: string): NonNullable<ReactNode> => {
            const surveyAnswer = surveyLog.surveyAnswers.find(surveyAnswer => surveyAnswer.resultIdentifier === resultIdentifier);
            return <>
                <div style={{ fontWeight: 'bold' }}>{label}</div>
                <div style={{ marginTop: '4px', color: 'var(--mdhui-text-color-2)', fontSize: '0.9em' }}>
                    {surveyAnswer && `A value of ${surveyAnswer.answers[0]} was recorded for ${resultIdentifier} for this day.`}
                    {!surveyAnswer && `No value was recorded for ${resultIdentifier} for this day.`}
                </div>
            </>;
        };

        const badgeConfigurations: SurveyLogBadgeConfiguration[] = [
            {
                identifier: 'activity',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'activity'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                getBadgeDetails: args.badgeDetails ? surveyLog => getBadgeDetails(surveyLog, 'Activity', 'activity') : undefined,
                icon: args.customIcons ? faWalking : undefined,
                iconColor: args.customIconColors ? '#3c973c' : undefined
            },
            {
                identifier: 'sleep',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'sleep'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                getBadgeDetails: args.badgeDetails ? surveyLog => getBadgeDetails(surveyLog, 'Sleep', 'sleep') : undefined,
                icon: args.customIcons ? faBed : undefined,
                iconColor: args.customIconColors ? '#664cda' : undefined
            },
            {
                identifier: 'swimming',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'swimming'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                getBadgeDetails: args.badgeDetails ? surveyLog => getBadgeDetails(surveyLog, 'Swimming', 'swimming') : undefined,
                icon: args.customIcons ? faSwimmer : undefined,
                iconColor: args.customIconColors ? '#0877b8' : undefined
            },
            {
                identifier: 'cycling',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'cycling'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                getBadgeDetails: args.badgeDetails ? surveyLog => getBadgeDetails(surveyLog, 'Cycling', 'cycling') : undefined,
                icon: args.customIcons ? faBicycle : undefined,
                iconColor: args.customIconColors ? '#976d1e' : undefined
            }
        ];

        const logSummary = <Card>
            <SurveyLogSummary
                title={args.customTitle ? 'Custom Title' : undefined}
                surveyLog={{
                    date: startOfToday(),
                    surveyAnswers: [
                        { resultIdentifier: 'activity', answers: ['5'] },
                        { resultIdentifier: 'hidden', answers: ['1'] },
                        { resultIdentifier: 'swimming', answers: ['3'] },
                        { resultIdentifier: 'sleep', answers: ['0'] }
                    ] as SurveyLogSurveyAnswer[],
                    dataPoints: []
                }}
                onEdit={noop}
                loading={args.loading}
            />
        </Card>;

        return <Layout colorScheme={args.colorScheme}>
            {args.badges && <SurveyLogBadgeCoordinator
                badgeConfigurations={badgeConfigurations}
                showFirstBadgeDetailsOnLoad={args.showFirstBadgeDetailsOnLoad}
                alwaysShowBadgeDetails={args.alwaysShowBadgeDetails}
                children={logSummary}
            />}
            {!args.badges && logSummary}
        </Layout>;
    }
};

export const Default: StoryObj<SurveyLogSummaryStoryArgs> = {
    args: {
        colorScheme: 'auto',
        customTitle: false,
        customStyling: false,
        badges: true,
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
        badges: {
            name: 'with badges',
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
        ...argTypesToHide(['title', 'surveyLog', 'onEdit', 'innerRef'])
    }
};