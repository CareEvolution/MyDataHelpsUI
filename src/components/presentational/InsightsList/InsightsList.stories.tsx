import React, { ComponentProps, CSSProperties } from 'react';
import { DateRangeCoordinator, InsightsBadgeConfiguration, InsightsRenderingCoordinator, Layout } from '../index';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import InsightsList from './InsightsList';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { DailyDataType, InsightsData, InsightsDataPreviewState } from '../../../helpers';
import { InsightsDataCoordinator } from '../../container';

type InsightListStoryArgs = ComponentProps<typeof InsightsList> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | InsightsDataPreviewState;
    canLog: boolean;
    withBadges: boolean;
    withDetails: boolean;
    customFiltering: boolean;
    customStyling: boolean;
};

export default {
    title: 'Presentational/InsightsList',
    component: InsightsList,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: InsightListStoryArgs) => {
        const customHighlightStyling: CSSProperties | undefined = args.customStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'border-radius: 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        const shouldHighlight = (insightsData: InsightsData, resultIdentifier: string): boolean => {
            const surveyAnswer = insightsData.surveyAnswers.find(surveyAnswer => surveyAnswer.resultIdentifier === resultIdentifier);
            return !!surveyAnswer && surveyAnswer.answers[0] !== '0';
        };

        const badgeConfigurations: InsightsBadgeConfiguration[] = [
            {
                identifier: 'activity',
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'result1'),
                customHighlightStyling: customHighlightStyling,
                icon: faWalking,
                iconColor: '#3c973c'
            },
            {
                identifier: 'sleep',
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'result2'),
                customHighlightStyling: customHighlightStyling,
                icon: faBed,
                iconColor: '#664cda'
            },
            {
                identifier: 'swimming',
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'result3'),
                customHighlightStyling: customHighlightStyling,
                icon: faSwimmer,
                iconColor: '#0877b8'
            },
            {
                identifier: 'cycling',
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'result4'),
                customHighlightStyling: customHighlightStyling,
                icon: faBicycle,
                iconColor: '#976d1e'
            }
        ];

        const surveyLogList = <InsightsList
            shouldRender={args.customFiltering ? surveyLog => surveyLog.surveyAnswers.length > 0 : undefined}
        />;

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Month">
                <InsightsDataCoordinator
                    previewState={args.previewState}
                    logSurveyName={args.canLog ? 'Log Survey' : undefined}
                    otherSurveyNames={['Other Survey']}
                    dailyDataTypes={[DailyDataType.AirQuality]}
                >
                    {(args.withBadges || args.withDetails) &&
                        <InsightsRenderingCoordinator
                            badgeConfigurations={args.withBadges ? badgeConfigurations : undefined}
                            getDetails={args.withDetails ? () => {
                                return <>
                                    <div style={{ fontWeight: 'bold' }}>Details</div>
                                    <div style={{ marginTop: '4px', color: 'var(--mdhui-text-color-2)', fontSize: '0.9em' }}>
                                        <div>Some details about the day.</div>
                                    </div>
                                </>;
                            } : undefined}
                            children={surveyLogList}
                        />}
                    {!(args.withBadges || args.withDetails) && surveyLogList}
                </InsightsDataCoordinator>
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<InsightListStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded',
        canLog: true,
        withBadges: true,
        withDetails: true,
        customFiltering: false,
        customStyling: false
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
            options: ['loading', 'loaded', 'reloading'],
            mapping: {
                'loaded': 'loaded with today',
                'reloading': 'reloading with today'
            }
        },
        canLog: {
            name: 'can log',
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
        customFiltering: {
            name: 'custom filtering',
            control: 'boolean'
        },
        customStyling: {
            name: 'custom styling',
            control: 'boolean'
        },
        ...argTypesToHide(['shouldRender', 'innerRef'])
    }
};
