import React, { CSSProperties } from 'react';
import { CalendarDayState, DateRangeCoordinator, Layout, SurveyLogStateCoordinator } from '../index';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyLogCalendar from './SurveyLogCalendar';
import { fnvPredictableRandomNumber, getDayKey, SurveyLog } from '../../../helpers';
import { isAfter, isSameDay } from 'date-fns';
import { SurveyLogCoordinator } from '../../container';

type SurveyLogCalendarStoryArgs = React.ComponentProps<typeof SurveyLogCalendar> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | 'loaded' | 'reloading';
    customStyling: boolean;
    includeStates: boolean;
    multiStateStartAngle: number;
    hasLegend: boolean;
    showLegend: boolean;
    customizeToday: boolean;
    customizeFuture: boolean;
    customizeNoData: boolean;
};

export default {
    title: 'Presentational/SurveyLogCalendar',
    component: SurveyLogCalendar,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyLogCalendarStoryArgs) => {
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

        const computePreviewStatesForDay = (date: Date, surveyLog?: SurveyLog): CalendarDayState[] => {
            if (states.length === 0) {
                return [];
            }

            const surveyAnswers = surveyLog?.surveyAnswers ?? [];

            if (surveyAnswers.some(surveyAnswer => parseInt(surveyAnswer.answers[0]) > 0)) {
                const dayKey = getDayKey(date);
                const statesCount = (fnvPredictableRandomNumber(dayKey + '-states-count') % states.length) + 1;

                const statesToReturn: CalendarDayState[] = [];
                let currentStateIndex = fnvPredictableRandomNumber(dayKey + '-states-start-index') % states.length;
                while (statesToReturn.length < statesCount) {
                    statesToReturn.push(states[currentStateIndex]);
                    currentStateIndex = (currentStateIndex + 1) % states.length;
                }

                return statesToReturn.sort((a, b) => states.indexOf(a) - states.indexOf(b));
            }

            if (isSameDay(date, new Date())) return args.customizeToday ? [{ borderColor: '#fff' }] : [];
            if (isAfter(date, new Date())) return args.customizeFuture ? [{ borderColor: '#fff' }] : [];
            return args.customizeNoData ? [{ borderColor: '#fff' }] : [];
        };

        const calendar = <SurveyLogCalendar showLegend={args.showLegend} />;

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Month">
                <SurveyLogCoordinator previewState={args.previewState} surveyName="Log Survey" dailyDataTypes={[]}>
                    {args.includeStates
                        ? <SurveyLogStateCoordinator
                            computeStatesForDay={computePreviewStatesForDay}
                            multiStateStartAngle={args.multiStateStartAngle}
                            legend={args.hasLegend ? states : undefined}
                            children={calendar}
                        />
                        : calendar
                    }
                </SurveyLogCoordinator>
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyLogCalendarStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded',
        customStyling: true,
        includeStates: true,
        multiStateStartAngle: 270,
        hasLegend: true,
        showLegend: true,
        customizeToday: false,
        customizeFuture: false,
        customizeNoData: false
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
        includeStates: {
            name: 'include states',
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
        ...argTypesToHide(['legend', 'innerRef'])
    }
};
