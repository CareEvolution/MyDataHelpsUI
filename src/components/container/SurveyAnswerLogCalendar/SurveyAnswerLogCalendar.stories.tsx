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
            'purple-state': {
                backgroundColor: '#664cda',
                borderColor: '#664cda',
                textColor: '#f4d6ff',
                style: customHighlightStyling,
                streakIdentifier: 'purple-state',
                streakColor: '#664cda'
            },
            'green-state': {
                backgroundColor: '#3c973c',
                borderColor: '#3c973c',
                textColor: '#bdead7',
                style: customHighlightStyling,
                streakIdentifier: 'green-state',
                streakColor: '#3c973c'
            },
            'blue-state': {
                backgroundColor: '#0877b8',
                borderColor: '#0877b8',
                textColor: '#abe0ff',
                style: customHighlightStyling,
                streakIdentifier: 'blue-state',
                streakColor: '#0877b8'
            }
        } : {};

        if (args.customizeToday) {
            stateConfiguration['today'] = { borderColor: '#fff' };
        }
        if (args.customizeFuture) {
            stateConfiguration['future'] = { borderColor: '#fff' };
        }
        if (args.customizeNoData) {
            stateConfiguration['no-data'] = { borderColor: '#fff' };
        }

        const answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined = args.showLogs ? [
            {
                resultIdentifier: 'activity',
                icon: faWalking,
                iconColor: '#3c973c',
                label: 'Activity',
                shouldHighlight: surveyAnswer => surveyAnswer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: surveyAnswer => `An activity level of ${surveyAnswer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'sleep',
                icon: faBed,
                iconColor: '#664cda',
                label: 'Sleep',
                shouldHighlight: surveyAnswer => surveyAnswer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: surveyAnswer => `A sleep level of ${surveyAnswer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'swimming',
                icon: faSwimmer,
                iconColor: '#0877b8',
                label: 'Swimming',
                shouldHighlight: surveyAnswer => surveyAnswer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: surveyAnswer => `A swimming level of ${surveyAnswer.answers[0]} was recorded on this day.`
            },
            {
                resultIdentifier: 'cycling',
                icon: faBicycle,
                iconColor: '#976d1e',
                label: 'Cycling',
                shouldHighlight: surveyAnswer => surveyAnswer.answers[0] !== '0',
                customHighlightStyling: customHighlightStyling,
                formatDisplayValue: surveyAnswer => `A cycling level of ${surveyAnswer.answers[0]} was recorded on this day.`
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
        ...argTypesToHide(['previewState', 'surveyName', 'stateConfiguration', 'computeState', 'answerRenderingConfigurations', 'innerRef'])
    }
};
