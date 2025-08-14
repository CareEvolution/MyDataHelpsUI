import React, { ComponentProps } from 'react';
import { Card, DateRangeCoordinator, Layout } from '../../presentational';
import SurveyAnswerChart, { SurveyAnswerChartProps } from './SurveyAnswerChart';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { generateSurveyData } from './SurveyAnswerChart.previewdata';

type SurveyAnswerChartStoryArgs = ComponentProps<typeof SurveyAnswerChart> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: 'default' | 'with gap' | 'with one data point' | 'with two data points' | 'live';
    withThreshold?: boolean;
    withDateRangeCoordinator?: boolean;
};

const meta: Meta<SurveyAnswerChartStoryArgs> = {
    title: 'Container/SurveyAnswerChart',
    component: SurveyAnswerChart,
    parameters: { layout: 'fullscreen' }
};
export default meta;

type Story = StoryObj<SurveyAnswerChartStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        state: 'default',
        title: 'Survey Answer Chart',
        chartType: 'Line',
        intervalType: 'Week',
        dynamicIntervalEndType: 'Last Reading',
        weekStartsOn: '6DaysAgo',
        expectedDataInterval: 'None' as any,
        withThreshold: false,
        withDateRangeCoordinator: false
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
            options: ['default', 'live']
        },
        title: {
            name: 'title',
            control: 'text'
        },
        chartType: {
            name: 'chart type',
            control: 'radio',
            options: ['Line', 'Bar', 'Area']
        },
        intervalType: {
            name: 'interval type',
            control: 'radio',
            options: ['Week', 'Month', '6Month', 'Dynamic']
        },
        dynamicIntervalEndType: {
            name: 'dynamic interval end type',
            control: 'radio',
            options: ['Last Reading', 'Today'],
            if: { arg: 'intervalType', eq: 'Dynamic' }
        },
        weekStartsOn: {
            name: 'week starts on',
            control: 'select',
            options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '6DaysAgo', '7DaysAgo']
        },
        expectedDataInterval: {
            name: 'expected data interval',
            control: 'select',
            options: ['None', 'Daily', 'Weekly', 'Monthly'],
            mapping: {
                'None': undefined,
                'Daily': { days: 1 },
                'Weekly': { weeks: 1 },
                'Monthly': { months: 1 }
            }
        },
        withThreshold: {
            name: 'with threshold',
            control: 'boolean'
        },
        withDateRangeCoordinator: {
            name: 'with date range coordinator',
            control: 'boolean',
            if: { arg: 'intervalType', neq: 'Dynamic' }
        },
        ...argTypesToHide(['series', 'options', 'previewDataProvider', 'previewState', 'innerRef'])
    },
    render: (args: SurveyAnswerChartStoryArgs) => {
        const props: SurveyAnswerChartProps = {
            ...args,
            series: [
                { color: '#377eb8', dataKey: 'Mood', surveyName: 'Some Survey', stepIdentifier: 'Some Step', resultIdentifier: 'Result 1' },
                { color: '#4daf4a', dataKey: 'Activity', surveyName: 'Some Survey', stepIdentifier: 'Some Step', resultIdentifier: 'Result 2' }
            ],
            options: {
                yAxisOptions: {
                    domain: [0, 'auto']
                },
                thresholds: args.withThreshold ? [{
                    value: 60,
                    referenceLineColor: 'purple',
                    overThresholdColor: 'purple'
                }] : undefined
            },
            previewState: args.state === 'default' ? 'default' : undefined
        };

        return <Layout colorScheme={args.colorScheme}>
            {!args.withDateRangeCoordinator &&
                <Card>
                    <SurveyAnswerChart {...props} />
                </Card>
            }
            {args.withDateRangeCoordinator &&
                <DateRangeCoordinator intervalType={props.intervalType as 'Week' | 'Month' | '6Month'}>
                    <Card>
                        <SurveyAnswerChart {...props} />
                    </Card>
                </DateRangeCoordinator>
            }
        </Layout>;
    }
};

export const FFWEL: Story = {
    name: 'FFWEL',
    args: {
        colorScheme: 'auto',
        state: 'default',
        chartType: 'Line',
        withThreshold: false,
        withDateRangeCoordinator: false
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
            options: ['default', 'with gap', 'with one data point', 'with two data points', 'live']
        },
        chartType: {
            name: 'chart type',
            control: 'radio',
            options: ['Line', 'Bar', 'Area']
        },
        withThreshold: {
            name: 'with threshold',
            control: 'boolean'
        },
        withDateRangeCoordinator: {
            name: 'with date range coordinator',
            control: 'boolean'
        },
        ...argTypesToHide([
            'title', 'intervalType', 'dynamicIntervalEndType', 'weekStartsOn', 'series', 'options',
            'expectedDataInterval', 'previewDataProvider', 'previewState', 'innerRef'
        ])
    },
    render: (args: SurveyAnswerChartStoryArgs) => {
        const props: SurveyAnswerChartProps = {
            ...args,
            title: 'Five Factor Wellness Inventory',
            intervalType: '6Month',
            weekStartsOn: '6DaysAgo',
            series: [
                { color: '#e41a1c', dataKey: 'Creative Self', surveyName: 'FFWEL', stepIdentifier: 'CreativeSelf', resultIdentifier: 'CreativeSelf' },
                { color: '#377eb8', dataKey: 'Coping Self', surveyName: 'FFWEL', stepIdentifier: 'CopingSelf', resultIdentifier: 'CopingSelf' },
                { color: '#4daf4a', dataKey: 'Social Self', surveyName: 'FFWEL', stepIdentifier: 'SocialSelf', resultIdentifier: 'SocialSelf' }
            ],
            options: {
                yAxisOptions: {
                    domain: [0, 'auto']
                },
                thresholds: args.withThreshold ? [{
                    value: 60,
                    referenceLineColor: 'purple',
                    overThresholdColor: 'purple'
                }] : undefined
            },
            expectedDataInterval: { months: 1 },
            previewDataProvider: args.state !== 'live' ? async (startDate: Date, endDate: Date): Promise<SurveyAnswer[][]> => {
                let data = await generateSurveyData(startDate, endDate, ['CreativeSelf', 'SocialSelf', 'CopingSelf'], 10, 100, { months: 1 });
                if (args.state === 'with gap') {
                    data[0].splice(data[0].length / 2, 1);
                    data[1].splice(data[1].length / 2, 1);
                    data[2].splice(data[2].length / 2, 1);
                } else if (args.state === 'with one data point') {
                    data = [[data[0][0]], [data[1][0]], [data[2][0]]];
                } else if (args.state === 'with two data points') {
                    data = [[data[0][0], data[0][1]], [data[1][0], data[1][1]], [data[2][0], data[2][1]]]
                }
                return data;
            } : undefined
        };

        return <Layout colorScheme={args.colorScheme}>
            {!args.withDateRangeCoordinator &&
                <Card>
                    <SurveyAnswerChart {...props} />
                </Card>
            }
            {args.withDateRangeCoordinator &&
                <DateRangeCoordinator intervalType="6Month">
                    <Card>
                        <SurveyAnswerChart {...props} />
                    </Card>
                </DateRangeCoordinator>
            }
        </Layout>;
    }
};

export const DailyPain: Story = {
    name: 'Daily Pain',
    args: {
        colorScheme: 'auto',
        state: 'default',
        title: 'Daily Pain',
        intervalType: 'Week',
        weekStartsOn: '6DaysAgo',
        series: [
            { dataKey: 'Pain Level', surveyName: 'Pain Survey', stepIdentifier: 'PainToday', resultIdentifier: 'PainToday' }
        ],
        chartType: 'Line',
        options: {
            yAxisOptions: {
                domain: [0, 'auto']
            }
        },
        expectedDataInterval: { days: 1 },
        withThreshold: false,
        withDateRangeCoordinator: false
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
            options: ['default', 'live']
        },
        chartType: {
            name: 'chart type',
            control: 'radio',
            options: ['Line', 'Bar', 'Area']
        },
        withThreshold: {
            name: 'with threshold',
            control: 'boolean'
        },
        withDateRangeCoordinator: {
            name: 'with date range coordinator',
            control: 'boolean'
        },
        ...argTypesToHide([
            'title', 'intervalType', 'dynamicIntervalEndType', 'weekStartsOn', 'series', 'options',
            'expectedDataInterval', 'previewDataProvider', 'previewState', 'innerRef'
        ])
    },
    render: (args: SurveyAnswerChartStoryArgs) => {
        const props: SurveyAnswerChartProps = {
            ...args,
            options: {
                ...args.options,
                thresholds: args.withThreshold ? [{
                    value: 5,
                    referenceLineColor: 'purple',
                    overThresholdColor: 'purple'
                }] : undefined
            },
            previewDataProvider: args.state !== 'live' ? async (startDate: Date, endDate: Date): Promise<SurveyAnswer[][]> => {
                return await generateSurveyData(startDate, endDate, ['PainToday'], 0, 10, { days: 1 });
            } : undefined
        };

        return <Layout colorScheme={args.colorScheme}>
            {!args.withDateRangeCoordinator &&
                <Card>
                    <SurveyAnswerChart {...props} />
                </Card>
            }
            {args.withDateRangeCoordinator &&
                <DateRangeCoordinator intervalType="Week">
                    <Card>
                        <SurveyAnswerChart {...props} />
                    </Card>
                </DateRangeCoordinator>
            }
        </Layout>;
    }
};