import React, { ComponentProps } from 'react';
import { Card, DateRangeCoordinator, Layout } from '../../presentational';
import SurveyAnswerChart, { SurveyAnswerChartProps } from './SurveyAnswerChart';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { generateSurveyAnswers } from '../../../helpers/survey-answer';


type SurveyAnswerChartStoryArgs = ComponentProps<typeof SurveyAnswerChart> & {
    colorScheme: 'auto' | 'light' | 'dark';
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
        previewState: 'default',
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
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['default', 'no data', 'with one data point', 'with one data point in first series', 'with two data points', 'with two data points in first series', 'with two data points in first series with gap', 'with gap', 'live'],
            mapping: { 'live': undefined }
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
        ...argTypesToHide(['series', 'options', 'previewDataProvider', 'innerRef'])
    },
    render: (args: SurveyAnswerChartStoryArgs) => {
        const props: SurveyAnswerChartProps = {
            ...args,
            series: [
                { color: '#f6670f', areaColor: '#f3a879', dataKey: 'Mood', surveyName: 'Some Survey', stepIdentifier: 'Some Step', resultIdentifier: 'Result 1' },
                { color: '#4daf4a', areaColor: '#9dea9b', dataKey: 'Activity', surveyName: 'Some Survey', stepIdentifier: 'Some Step', resultIdentifier: 'Result 2' }
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
            }
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
        previewState: 'default',
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
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['default', 'no data', 'with one data point', 'with one data point in first series', 'with two data points', 'with two data points in first series', 'with two data points in first series with gap', 'with gap', 'live'],
            mapping: { 'live': undefined }
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
            'expectedDataInterval', 'previewDataProvider', 'innerRef'
        ])
    },
    render: (args: SurveyAnswerChartStoryArgs) => {
        const props: SurveyAnswerChartProps = {
            ...args,
            title: 'Five Factor Wellness Inventory',
            intervalType: '6Month',
            weekStartsOn: '6DaysAgo',
            series: [
                { color: '#e41a1c', areaColor: '#ed7172', dataKey: 'Creative Self', surveyName: 'FFWEL', stepIdentifier: 'CreativeSelf', resultIdentifier: 'CreativeSelf' },
                { color: '#377eb8', areaColor: '#7bbdf3', dataKey: 'Coping Self', surveyName: 'FFWEL', stepIdentifier: 'CopingSelf', resultIdentifier: 'CopingSelf' },
                { color: '#4daf4a', areaColor: '#98f395', dataKey: 'Social Self', surveyName: 'FFWEL', stepIdentifier: 'SocialSelf', resultIdentifier: 'SocialSelf' }
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
            previewDataProvider: args.previewState ? (startDate: Date, endDate: Date) => {
                return generateSurveyAnswers(startDate, endDate, ['CreativeSelf', 'SocialSelf', 'CopingSelf'], 10, 100, { months: 1 });
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
        previewState: 'default',
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
        withThreshold: false,
        withDateRangeCoordinator: false
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
            options: ['default', 'no data', 'with one data point', 'with two data points', 'with gap', 'live'],
            mapping: { 'live': undefined }
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
            'expectedDataInterval', 'previewDataProvider', 'innerRef'
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
            expectedDataInterval: { days: 1 },
            previewDataProvider: args.previewState ? (startDate: Date, endDate: Date) => {
                return generateSurveyAnswers(startDate, endDate, ['PainToday'], 0, 10, { days: 1 });
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