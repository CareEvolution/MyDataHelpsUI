import React, { CSSProperties, ReactNode } from 'react';
import { CalendarDayState, CalendarDayStates, DateRangeCoordinator, InsightsBadgeConfiguration, InsightsRenderingCoordinator, InsightsStateCoordinator, Layout } from '../index';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import InsightsCalendar from './InsightsCalendar';
import { fnvPredictableRandomNumber, getDayKey, InsightsData, InsightsDataPreviewState } from '../../../helpers';
import { isAfter, isBefore, isToday, startOfToday } from 'date-fns';
import { InsightsDataCoordinator } from '../../container';
import { faBed, faBicycle, faBurn, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';

type InsightsCalendarStoryArgs = React.ComponentProps<typeof InsightsCalendar> & {
    colorScheme: 'auto' | 'light' | 'dark';
    intervalType: 'Month' | 'Week';
    previewState: 'loading' | InsightsDataPreviewState;
    withStates: boolean;
    withBadges: boolean;
    withNotes: boolean;
    multiStateStartAngle: number;
    hasLegend: boolean;
    customizeToday: boolean;
    customizeFuture: boolean;
    customizeNoData: boolean;
    customizeStatesNote: boolean;
    customStyling: boolean;
};

export default {
    title: 'Presentational/InsightsCalendar',
    component: InsightsCalendar,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: InsightsCalendarStoryArgs) => {
        const customHighlightStyling: CSSProperties | undefined = args.customStyling ? {
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'border-radius: 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease'
        } : undefined;

        const states: CalendarDayState[] = [
            {
                label: 'Sleep',
                backgroundColor: '#664cda',
                borderColor: '#664cda',
                textColor: '#f4d6ff',
                style: customHighlightStyling,
                streakIdentifier: 'purple-state',
                streakColor: '#664cda',
                combineWhenSolo: true
            },
            {
                label: 'Activity',
                backgroundColor: '#3c973c',
                borderColor: '#3c973c',
                textColor: '#bdead7',
                style: customHighlightStyling,
                streakIdentifier: 'green-state',
                streakColor: '#3c973c',
                combineWhenSolo: true
            },
            {
                label: 'Swimming',
                backgroundColor: '#0877b8',
                borderColor: '#0877b8',
                textColor: '#abe0ff',
                style: customHighlightStyling,
                streakIdentifier: 'blue-state',
                streakColor: '#0877b8',
                combineWhenSolo: true
            }
        ];

        const computePreviewStatesForDay = (date: Date, insightsData?: InsightsData): CalendarDayStates => {
            const statesForDay: CalendarDayStates = [];

            const surveyAnswers = insightsData?.surveyAnswers ?? [];
            const dayKey = getDayKey(date);

            if (surveyAnswers.some(surveyAnswer => parseInt(surveyAnswer.answers[0]) > 0)) {
                const statesCount = (fnvPredictableRandomNumber(dayKey + '-states-count') % states.length) + 1;
                let currentStateIndex = fnvPredictableRandomNumber(dayKey + '-states-start-index') % states.length;
                while (statesForDay.length < statesCount) {
                    statesForDay.push(states[currentStateIndex]);
                    currentStateIndex = (currentStateIndex + 1) % states.length;
                }
                statesForDay.sort((a, b) => states.indexOf(a) - states.indexOf(b));
            } else if (isToday(date) && args.customizeToday) {
                statesForDay.push({ borderColor: { lightMode: '#000', darkMode: '#fff' } });
            } else if (isAfter(date, new Date()) && args.customizeFuture) {
                statesForDay.push({ borderColor: { lightMode: '#000', darkMode: '#fff' } });
            } else if (isBefore(date, startOfToday()) && args.customizeNoData) {
                statesForDay.push({ borderColor: { lightMode: '#000', darkMode: '#fff' } });
            }

            if (args.withNotes && fnvPredictableRandomNumber(dayKey + '-states-note-include') % 2 === 0) {
                statesForDay.note = 'note';
                if (args.customizeStatesNote) {
                    statesForDay.noteBorderColor = { lightMode: '#000', darkMode: '#fff' };
                }
            }

            return statesForDay;
        };

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
            },
            {
                identifier: 'other',
                shouldRender: () => false,
                shouldHighlight: insightsData => shouldHighlight(insightsData, 'other'),
                customHighlightStyling: args.customStyling ? customHighlightStyling : undefined,
                icon: faBurn,
                iconColor: '#d81442'
            }
        ];

        const calendar = <InsightsCalendar showLegend={args.showLegend} />;

        const wrapWithStateCoordinatorIfNecessary = (children: ReactNode): ReactNode => {
            return args.withStates
                ? <InsightsStateCoordinator
                    computeStatesForDay={computePreviewStatesForDay}
                    multiStateStartAngle={args.multiStateStartAngle}
                    legend={args.hasLegend ? states : undefined}
                    children={children}
                />
                : children;
        };

        const wrapWithRenderingCoordinatorIfNecessary = (children: ReactNode): ReactNode => {
            return args.withBadges
                ? <InsightsRenderingCoordinator
                    badgeConfigurations={badgeConfigurations}
                    children={children}
                />
                : children;
        };

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType={args.intervalType} weekStartsOn="6DaysAgo">
                <InsightsDataCoordinator previewState={args.previewState} logSurveyName="Log Survey">
                    {wrapWithStateCoordinatorIfNecessary(
                        wrapWithRenderingCoordinatorIfNecessary(calendar)
                    )}
                </InsightsDataCoordinator>
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<InsightsCalendarStoryArgs> = {
    args: {
        colorScheme: 'auto',
        intervalType: 'Month',
        previewState: 'loaded',
        withStates: true,
        withBadges: false,
        withNotes: false,
        multiStateStartAngle: 270,
        hasLegend: true,
        showLegend: true,
        customizeToday: false,
        customizeFuture: false,
        customizeNoData: false,
        customizeStatesNote: false,
        customStyling: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        intervalType: {
            name: 'interval type',
            control: 'radio',
            options: ['Month', 'Week']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'loaded', 'reloading']
        },
        withStates: {
            name: 'with states',
            control: 'boolean'
        },
        withBadges: {
            name: 'with badges',
            control: 'boolean'
        },
        withNotes: {
            name: 'with notes',
            control: 'boolean'
        },
        multiStateStartAngle: {
            name: 'multi-state start angle',
            control: {
                type: 'range',
                min: 0,
                max: 360,
                step: 1
            }
        },
        hasLegend: {
            name: 'has legend',
            control: 'boolean'
        },
        showLegend: {
            name: 'show legend',
            control: 'boolean'
        },
        customizeToday: {
            name: 'customize today',
            control: 'boolean'
        },
        customizeFuture: {
            name: 'customize future',
            control: 'boolean'
        },
        customizeNoData: {
            name: 'customize no-data',
            control: 'boolean'
        },
        customizeStatesNote: {
            name: 'customize states note',
            control: 'boolean'
        },
        customStyling: {
            name: 'custom styling',
            control: 'boolean'
        },
        ...argTypesToHide(['legend', 'innerRef'])
    }
};
