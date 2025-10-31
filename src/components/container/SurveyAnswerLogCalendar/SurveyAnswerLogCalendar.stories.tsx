import React, { CSSProperties } from 'react';
import { CalendarDayStateConfiguration, DateRangeCoordinator, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogCalendar from './SurveyAnswerLogCalendar';
import { SurveyAnswerRenderingConfiguration } from '../../../helpers';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';

const customHighlightStyling: CSSProperties = {
    boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.3), inset 5px 5px 10px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'border-radius: 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease'
};

type SurveyAnswerLogCalendarStoryArgs = React.ComponentProps<typeof SurveyAnswerLogCalendar> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: 'loading' | 'default';
    includeStates: boolean;
    customizeToday: boolean;
    customizeFuture: boolean;
    customizeNoData: boolean;
    showLogs: boolean;
};

export default {
    title: 'Container/SurveyAnswerLogCalendar',
    component: SurveyAnswerLogCalendar,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogCalendarStoryArgs) => {
        const stateConfiguration: CalendarDayStateConfiguration = args.includeStates ? {
            'red-state': {
                style: {
                    background: '#664cda',
                    border: '2px solid #664cda',
                    marginTop: '-12px',
                    color: '#f4d6ff',
                    ...customHighlightStyling
                },
                streak: true,
                streakColor: '#edc4ff'
            },
            'green-state': {
                style: {
                    background: '#3c973c',
                    border: '2px solid #3c973c',
                    marginTop: '-12px',
                    color: '#bdead7',
                    ...customHighlightStyling
                },
                streak: true,
                streakColor: '#bdead7'
            },
            'blue-state': {
                style: {
                    background: '#0877b8',
                    border: '2px solid #0877b8',
                    marginTop: '-12px',
                    color: '#abe0ff',
                    ...customHighlightStyling
                },
                streak: true,
                streakColor: '#67c0f4'
            }
        } : {};

        if (args.customizeToday) {
            stateConfiguration['today'] = { style: { border: '2px solid #fff', marginTop: '-12px' } };
        }
        if (args.customizeFuture) {
            stateConfiguration['future'] = { style: { border: '2px solid #fff', marginTop: '-12px' } };
        }
        if (args.customizeNoData) {
            stateConfiguration['no-data'] = { style: { border: '2px solid #fff', marginTop: '-12px' } };
        }

        const answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined = args.showLogs ? [
            {
                resultIdentifier: 'activity',
                icon: faWalking,
                iconColor: '#3c973c',
                label: 'Activity',
                shouldHighlight: () => false,
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: () => 'custom display value'
            },
            {
                resultIdentifier: 'sleep',
                icon: faBed,
                iconColor: '#664cda',
                label: 'Sleep',
                shouldHighlight: () => false,
                customHighlightStyling: customHighlightStyling
            },
            {
                resultIdentifier: 'swimming',
                icon: faSwimmer,
                iconColor: '#0877b8',
                label: 'Swimming',
                shouldHighlight: () => false,
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: () => 'custom display value'
            },
            {
                resultIdentifier: 'cycling',
                icon: faBicycle,
                iconColor: '#976d1e',
                label: 'Cycling',
                shouldHighlight: () => false,
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: () => 'custom display value'
            }
        ] : undefined;

        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Month">
                <SurveyAnswerLogCalendar
                    {...args}
                    previewState={args.state}
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
            options: ['loading', 'default', 'reloading']
        },
        includeStates: {
            name: 'include states',
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
        showLogs: {
            name: 'show logs',
            control: 'boolean'
        },
        ...argTypesToHide(['previewState', 'surveyName', 'computeState', 'answerRenderingConfigurations', 'innerRef'])
    }
};
