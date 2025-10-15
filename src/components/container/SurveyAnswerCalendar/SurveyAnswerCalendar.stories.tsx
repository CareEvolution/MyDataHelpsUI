import React from 'react';
import { Card, DateRangeCoordinator, Layout } from '../../presentational';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerCalendar from './SurveyAnswerCalendar';

type SurveyAnswerCalendarStoryArgs = React.ComponentProps<typeof SurveyAnswerCalendar> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

export default {
    title: 'Container/SurveyAnswerCalendar',
    component: SurveyAnswerCalendar,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerCalendarStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Month">
                <Card>
                    <SurveyAnswerCalendar {...args} />
                </Card>
            </DateRangeCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerCalendarStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'default',
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
        }
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        ...argTypesToHide(['previewState', 'surveyName', 'resultIdentifiers', 'computeState', 'eventPrefix', 'intervalStart', 'innerRef'])
    }
};
