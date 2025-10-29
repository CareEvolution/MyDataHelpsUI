import React from 'react';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import SurveyAnswerLogCoordinator from './SurveyAnswerLogCoordinator';
import { Card, DateRangeCoordinator, Layout, SurveyAnswerLogCalendar } from '../../presentational';

type SurveyAnswerLogCoordinatorStoryArgs = React.ComponentProps<typeof SurveyAnswerLogCoordinator> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

export default {
    title: 'Container/SurveyAnswerLogCoordinator',
    component: SurveyAnswerLogCoordinator,
    parameters: {
        layout: 'fullscreen'
    },
    render: (args: SurveyAnswerLogCoordinatorStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <SurveyAnswerLogCoordinator {...args}>
                <DateRangeCoordinator intervalType="Month">
                    <Card>
                        <SurveyAnswerLogCalendar
                            previewState="default"
                            stateConfiguration={{
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
                            }}
                        />
                    </Card>
                </DateRangeCoordinator>
            </SurveyAnswerLogCoordinator>
        </Layout>;
    }
};

export const Default: StoryObj<SurveyAnswerLogCoordinatorStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'with data'
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
            options: ['loading', 'no data', 'with data']
        },
        ...argTypesToHide(['surveyName', 'innerRef'])
    }
};
