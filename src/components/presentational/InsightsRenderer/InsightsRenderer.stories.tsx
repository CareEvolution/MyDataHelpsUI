import React, { ComponentProps, CSSProperties } from 'react';
import { Card, InsightsBadgeConfiguration, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import InsightsRenderer from './InsightsRenderer';
import { noop } from '../../../helpers/functions';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { startOfToday } from 'date-fns';
import { InsightsData } from '../../../helpers';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';

type InsightsRendererStoryArgs = ComponentProps<typeof InsightsRenderer> & {
    colorScheme: 'auto' | 'light' | 'dark';
    customTitle: boolean;
    canLog: boolean;
    hasLogged: boolean;
    withBadges: boolean;
    withDetails: boolean;
    customBadgeIcons: boolean;
    customBadgeIconColors: boolean;
    customStyling: boolean;
};

export default {
    title: 'Presentational/InsightsRenderer',
    component: InsightsRenderer,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: InsightsRendererStoryArgs) => {
        const customHighlightStyling: CSSProperties | undefined = args.customStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'border-radius 0.5s, transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        const shouldHighlight = (insightsData: InsightsData, resultIdentifier: string): boolean => {
            const surveyAnswer = insightsData.surveyAnswers.find(surveyAnswer => surveyAnswer.resultIdentifier === resultIdentifier);
            return !!surveyAnswer && surveyAnswer.answers[0] !== '0';
        };

        const badgeConfigurations: InsightsBadgeConfiguration[] = [
            {
                identifier: 'activity',
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'activity'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                icon: args.customBadgeIcons ? faWalking : undefined,
                iconColor: args.customBadgeIconColors ? '#3c973c' : undefined
            },
            {
                identifier: 'sleep',
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'sleep'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                icon: args.customBadgeIcons ? faBed : undefined,
                iconColor: args.customBadgeIconColors ? '#664cda' : undefined
            },
            {
                identifier: 'swimming',
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'swimming'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                icon: args.customBadgeIcons ? faSwimmer : undefined,
                iconColor: args.customBadgeIconColors ? '#0877b8' : undefined
            },
            {
                identifier: 'cycling',
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'cycling'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                icon: args.customBadgeIcons ? faBicycle : undefined,
                iconColor: args.customBadgeIconColors ? '#976d1e' : undefined
            }
        ];

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <InsightsRenderer
                    title={args.customTitle ? 'Custom Title' : undefined}
                    logSurveyName={args.canLog ? 'Log Survey' : undefined}
                    onEnterSurveyLog={noop}
                    badgeConfigurations={args.withBadges ? badgeConfigurations : undefined}
                    getDetails={args.withDetails ? () => {
                        return <>
                            <div style={{ fontWeight: 'bold' }}>Details</div>
                            <div style={{ marginTop: '4px', color: 'var(--mdhui-text-color-2)', fontSize: '0.9em' }}>
                                <div>Some details about the day.</div>
                            </div>
                        </>;
                    } : undefined}
                    insightsData={{
                        date: startOfToday(),
                        surveyAnswers: [
                            { surveyName: args.hasLogged ? 'Log Survey' : undefined, resultIdentifier: 'activity', answers: ['5'] },
                            { resultIdentifier: 'sleep', answers: ['0'] },
                            { resultIdentifier: 'swimming', answers: ['3'] }
                        ] as SurveyAnswer[],
                        dataPoints: []
                    }}
                    loading={args.loading}
                />
            </Card>
        </Layout>;
    }
};

export const Default: StoryObj<InsightsRendererStoryArgs> = {
    args: {
        colorScheme: 'auto',
        customTitle: false,
        canLog: true,
        hasLogged: false,
        withBadges: true,
        withDetails: true,
        customBadgeIcons: true,
        customBadgeIconColors: true,
        customStyling: false,
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
        canLog: {
            name: 'can log',
            control: 'boolean'
        },
        hasLogged: {
            name: 'has logged',
            control: 'boolean'
        },
        withBadges: {
            name: 'with badges',
            control: 'boolean'
        },
        withDetails: {
            name: 'with details',
            control: 'boolean'
        },
        customBadgeIcons: {
            name: 'custom icons',
            control: 'boolean'
        },
        customBadgeIconColors: {
            name: 'custom icon colors',
            control: 'boolean'
        },
        customStyling: {
            name: 'custom styling',
            control: 'boolean'
        },
        loading: {
            name: 'loading',
            control: 'boolean'
        },
        ...argTypesToHide(['title', 'logSurveyName', 'onEnterSurveyLog', 'badgeConfigurations', 'getDetails', 'insightsData', 'innerRef'])
    }
};