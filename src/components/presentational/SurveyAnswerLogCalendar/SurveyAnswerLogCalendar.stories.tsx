import React from 'react';
import { Card, DateRangeCoordinator, Layout } from '../index';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogCalendar from './SurveyAnswerLogCalendar';
import { SurveyAnswerLogCoordinator } from '../../container';

type SurveyAnswerLogCalendarStoryArgs = React.ComponentProps<typeof SurveyAnswerLogCalendar> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: 'loading' | 'default';
    customizeToday: boolean;
    customizeFuture: boolean;
    customizeNoData: boolean;
};

export default {
    title: 'Presentational/SurveyAnswerLogCalendar',
    component: SurveyAnswerLogCalendar,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogCalendarStoryArgs) => {
        const stateConfiguration = { ...args.stateConfiguration };
        if (args.customizeToday) {
            stateConfiguration['today'] = { style: { background: 'aquamarine', color: 'black' } };
        }
        if (args.customizeFuture) {
            stateConfiguration['future'] = { style: { background: 'cornflowerblue', color: 'black' } };
        }
        if (args.customizeNoData) {
            stateConfiguration['no-data'] = { style: { background: 'pink', color: 'black' } };
        }

        return <Layout colorScheme={args.colorScheme}>
            <SurveyAnswerLogCoordinator previewState={args.state === 'loading' ? 'loading' : 'with data'} surveyName="Some Survey">
                <DateRangeCoordinator intervalType="Month">
                    <Card>
                        <SurveyAnswerLogCalendar
                            {...args}
                            previewState={args.state ? 'default' : undefined}
                            stateConfiguration={stateConfiguration}
                        />
                    </Card>
                </DateRangeCoordinator>
            </SurveyAnswerLogCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogCalendarStoryArgs> = {
    args: {
        colorScheme: 'auto',
        state: 'default',
        stateConfiguration: {
            'purple-state': {
                style: {
                    background: '#471068',
                    color: '#f4d6ff'
                },
                streak: true,
                streakColor: '#f4d6ff'
            },
            'green-state': {
                style: {
                    background: '#00675b',
                    color: '#bdead7'
                },
                streak: true,
                streakColor: '#bdead7'
            },
            'yellow-state': {
                style: {
                    background: '#f6c400',
                    color: '#251c00'
                }
            }
        },
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
        state: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'default']
        },
        stateConfiguration: {
            name: 'state configuration'
        },
        customizeToday: {
            name: 'customize today?'
        },
        customizeFuture: {
            name: 'customize future?'
        },
        customizeNoData: {
            name: 'customize no-data?'
        },
        ...argTypesToHide(['previewState', 'surveyName', 'computeState', 'innerRef'])
    }
};
