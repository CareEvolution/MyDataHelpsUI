import React, { CSSProperties } from 'react';
import { CalendarDayStateConfiguration, DateRangeCoordinator, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogCalendar from './SurveyAnswerLogCalendar';
import { SurveyAnswerRenderingConfiguration } from '../../../helpers';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';

type SurveyAnswerLogCalendarStoryArgs = React.ComponentProps<typeof SurveyAnswerLogCalendar> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: 'loading' | 'default';
    includeStates: boolean;
    customizeToday: boolean;
    customizeFuture: boolean;
    customizeNoData: boolean;
    showLogs: boolean;
};

const customHighlightStyling: CSSProperties = {
    boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
};

export default {
    title: 'Container/SurveyAnswerLogCalendar',
    component: SurveyAnswerLogCalendar,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogCalendarStoryArgs) => {
        const stateConfiguration: CalendarDayStateConfiguration = args.includeStates ? {
            'purple-state': {
                style: {
                    background: '#671e93',
                    color: '#f4d6ff',
                    ...customHighlightStyling
                },
                streak: true,
                streakColor: '#f4d6ff'
            },
            'green-state': {
                style: {
                    background: '#00675b',
                    color: '#bdead7',
                    ...customHighlightStyling
                },
                streak: true,
                streakColor: '#bdead7'
            },
            'yellow-state': {
                style: {
                    background: '#f6c400',
                    color: '#251c00',
                    ...customHighlightStyling
                }
            }
        } : {};

        if (args.customizeToday) {
            stateConfiguration['today'] = { style: { background: 'aquamarine', color: 'black' } };
        }
        if (args.customizeFuture) {
            stateConfiguration['future'] = { style: { background: 'cornflowerblue', color: 'black' } };
        }
        if (args.customizeNoData) {
            stateConfiguration['no-data'] = { style: { background: 'pink', color: 'black' } };
        }

        const answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined = args.showLogs ? [
            {
                resultIdentifier: 'activity',
                icon: faWalking,
                iconColor: '#3c973c',
                label: 'Activity',
                shouldHighlight: answer => answer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: answer => `An activity level of ${answer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'sleep',
                icon: faBed,
                iconColor: '#664cda',
                label: 'Sleep',
                shouldHighlight: answer => answer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: answer => `A sleep level of ${answer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'swimming',
                icon: faSwimmer,
                iconColor: '#0877b8',
                label: 'Swimming',
                shouldHighlight: answer => answer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: answer => `A swimming level of ${answer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'cycling',
                icon: faBicycle,
                iconColor: '#976d1e',
                label: 'Cycling',
                shouldHighlight: answer => answer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: answer => `A cycling level of ${answer.answers[0]} was recorded on this day.`
            }
        ] : undefined;

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Month">
                <SurveyAnswerLogCalendar
                    {...args}
                    previewState={args.state ? 'default' : undefined}
                    stateConfiguration={stateConfiguration}
                    answerRenderingConfigurations={answerRenderingConfigurations}
                />
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogCalendarStoryArgs> = {
    args: {
        colorScheme: 'auto',
        state: 'default',
        includeStates: true,
        customizeToday: false,
        customizeFuture: false,
        customizeNoData: false,
        showLogs: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        state: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'default']
        },
        includeStates: {
            name: 'include states?',
            control: 'boolean'
        },
        customizeToday: {
            name: 'customize today?',
            control: 'boolean'
        },
        customizeFuture: {
            name: 'customize future?',
            control: 'boolean'
        },
        customizeNoData: {
            name: 'customize no-data?',
            control: 'boolean'
        },
        showLogs: {
            name: 'show logs?',
            control: 'boolean'
        },
        ...argTypesToHide(['previewState', 'surveyName', 'computeState', 'answerRenderingConfigurations', 'innerRef'])
    }
};
