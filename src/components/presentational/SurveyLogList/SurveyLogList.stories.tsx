import React, { CSSProperties, ReactNode } from 'react';
import { DateRangeCoordinator, Layout, SurveyLogBadgeConfiguration, SurveyLogBadgeCoordinator } from '../index';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyLogList from './SurveyLogList';
import { SurveyLog } from '../../../helpers';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { SurveyLogCoordinator } from '../../container';

type SurveyLogListStoryArgs = React.ComponentProps<typeof SurveyLogList> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | 'loaded' | 'reloading';
    customStyling: boolean;
    useBadges: boolean;
};

export default {
    title: 'Presentational/SurveyLogList',
    component: SurveyLogList,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyLogListStoryArgs) => {
        const customHighlightStyling: CSSProperties | undefined = args.customStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'border-radius: 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease'
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
                    {surveyAnswer && `A value of ${surveyAnswer.answers[0]} was recorded for ${label.toLowerCase()} for this day.`}
                    {!surveyAnswer && `No value was recorded for ${label.toLowerCase()} for this day.`}
                </div>
            </>;
        };

        const badgeConfigurations: SurveyLogBadgeConfiguration[] = [
            {
                identifier: 'activity',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'result1'),
                customHighlightStyling: customHighlightStyling,
                getBadgeDetails: surveyLog => getBadgeDetails(surveyLog, 'Activity', 'result1'),
                icon: faWalking,
                iconColor: '#3c973c'
            },
            {
                identifier: 'sleep',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'result2'),
                customHighlightStyling: customHighlightStyling,
                getBadgeDetails: surveyLog => getBadgeDetails(surveyLog, 'Sleep', 'result2'),
                icon: faBed,
                iconColor: '#664cda'
            },
            {
                identifier: 'swimming',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'result3'),
                customHighlightStyling: customHighlightStyling,
                getBadgeDetails: surveyLog => getBadgeDetails(surveyLog, 'Swimming', 'result3'),
                icon: faSwimmer,
                iconColor: '#0877b8'
            },
            {
                identifier: 'cycling',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'result4'),
                customHighlightStyling: customHighlightStyling,
                getBadgeDetails: surveyLog => getBadgeDetails(surveyLog, 'Cycling', 'result4'),
                icon: faBicycle,
                iconColor: '#976d1e'
            }
        ];

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Month">
                <SurveyLogCoordinator previewState={args.previewState} surveyName="Log Survey" dailyDataTypes={[]}>
                    {args.useBadges && <SurveyLogBadgeCoordinator badgeConfigurations={badgeConfigurations}><SurveyLogList /></SurveyLogBadgeCoordinator>}
                    {!args.useBadges && <SurveyLogList />}
                </SurveyLogCoordinator>
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyLogListStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded',
        customStyling: true,
        useBadges: true
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
            options: ['loading', 'loaded', 'reloading']
        },
        useBadges: {
            name: 'use badges',
            control: 'boolean'
        },
        ...argTypesToHide(['innerRef'])
    }
};
