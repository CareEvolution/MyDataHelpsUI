import React, { CSSProperties } from 'react';
import { DateRangeCoordinator, Layout, SurveyLogBadgeConfiguration, SurveyLogBadgeCoordinator } from '../index';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyLogPreview from './SurveyLogPreview';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { SurveyLog, SurveyLogPreviewState } from '../../../helpers';
import { SurveyLogCoordinator } from '../../container';

type SurveyLogPreviewStoryArgs = React.ComponentProps<typeof SurveyLogPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | SurveyLogPreviewState;
    canLog: boolean;
    withBadges: boolean;
    withDetails: boolean;
    customStyling: boolean;
};

export default {
    title: 'Presentational/SurveyLogPreview',
    component: SurveyLogPreview,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyLogPreviewStoryArgs) => {
        const customHighlightStyling: CSSProperties | undefined = args.customStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'border-radius 0.5s, transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        const shouldHighlight = (surveyLog: SurveyLog, resultIdentifier: string): boolean => {
            const surveyAnswer = surveyLog.surveyAnswers.find(surveyAnswer => surveyAnswer.resultIdentifier === resultIdentifier);
            return !!surveyAnswer && surveyAnswer.answers[0] !== '0';
        };

        const badgeConfigurations: SurveyLogBadgeConfiguration[] = [
            {
                identifier: 'activity',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'result1'),
                customHighlightStyling: customHighlightStyling,
                icon: faWalking,
                iconColor: '#3c973c'
            },
            {
                identifier: 'sleep',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'result2'),
                customHighlightStyling: customHighlightStyling,
                icon: faBed,
                iconColor: '#664cda'
            },
            {
                identifier: 'swimming',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'result3'),
                customHighlightStyling: customHighlightStyling,
                icon: faSwimmer,
                iconColor: '#0877b8'
            },
            {
                identifier: 'cycling',
                shouldHighlight: surveyLog => shouldHighlight(surveyLog, 'result4'),
                customHighlightStyling: customHighlightStyling,
                icon: faBicycle,
                iconColor: '#976d1e'
            }
        ];

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Day">
                <SurveyLogCoordinator previewState={args.previewState} logSurveyName={args.canLog ? 'Log Survey' : undefined}>
                    {(args.withBadges || args.withDetails) &&
                        <SurveyLogBadgeCoordinator
                            badgeConfigurations={args.withBadges ? badgeConfigurations : undefined}
                            getDetails={args.withDetails ? () => {
                                return <>
                                    <div style={{ fontWeight: 'bold' }}>Details</div>
                                    <div style={{ marginTop: '4px', color: 'var(--mdhui-text-color-2)', fontSize: '0.9em' }}>
                                        <div>Some details about the day.</div>
                                    </div>
                                </>;
                            } : undefined}
                            children={<SurveyLogPreview />}
                        />}
                    {!(args.withBadges || args.withDetails) && <SurveyLogPreview />}
                </SurveyLogCoordinator>
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyLogPreviewStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded',
        canLog: true,
        withBadges: true,
        withDetails: true,
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
            options: ['loading', 'loaded', 'reloading', 'loaded with today', 'reloading with today']
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
        customStyling: {
            name: 'custom styling',
            control: 'boolean'
        },
        ...argTypesToHide(['innerRef'])
    }
};
