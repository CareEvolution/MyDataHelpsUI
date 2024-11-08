import React from 'react'
import InsightMatrix from './InsightMatrix'
import { Card, Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
    createAverageValueInsightMatrixValueCalculator,
    createIntegerInsightMatrixValueFormatter,
    createMinMaxInsightMatrixValueEvaluator,
    createMinutesToHoursInsightMatrixValueFormatter,
    createPercentageOfDaysInsightMatrixValueCalculator,
    createShrinkThousandsInsightMatrixValueFormatter,
    DailyDataType,
    InsightMatrixComparisonDataConfiguration,
    InsightMatrixDataConfiguration,
    InsightMatrixGroupByDataConfiguration
} from '../../../helpers';
import { argTypesToHide } from '../../../../.storybook/helpers';

type InsightMatrixDataConfigurationName = 'mood' | 'sleep' | 'steps' | 'mindful' | 'therapy';

type InsightMatrixStoryArgs = React.ComponentProps<typeof InsightMatrix> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'preview' | 'live';
    groupByDataConfigurationName: InsightMatrixDataConfigurationName;
    comparisonDataConfigurationNames: InsightMatrixDataConfigurationName[];
    useGoodValueIndicator: boolean;
};

const dataConfigurations: Record<InsightMatrixDataConfigurationName, InsightMatrixDataConfiguration> = {
    'mood': createMoodRatingDataConfiguration(),
    'sleep': createSleepDataConfiguration(),
    'steps': createStepsDataConfiguration(),
    'mindful': createMindfulDataConfiguration(),
    'therapy': createTherapyDataConfiguration()
};

const meta: Meta<InsightMatrixStoryArgs> = {
    title: 'Container/InsightMatrix',
    component: InsightMatrix,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        const getGroupByLabel = (configurationName: InsightMatrixDataConfigurationName) => {
            switch (configurationName) {
                case 'mood':
                    return 'When mood rating was...';
                case 'sleep':
                    return 'When sleep time was...';
                case 'steps':
                    return 'When steps were...';
                case 'mindful':
                    return 'When mindful activity was...';
                case 'therapy':
                    return 'When therapeutic activity was...';
            }
        };

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <InsightMatrix
                    {...args}
                    preview={args.previewState === 'preview'}
                    groupByDataConfiguration={{
                        ...dataConfigurations[args.groupByDataConfigurationName] as InsightMatrixGroupByDataConfiguration,
                        label: getGroupByLabel(args.groupByDataConfigurationName)
                    }}
                    comparisonDataConfigurations={args.comparisonDataConfigurationNames.map(configurationName => dataConfigurations[configurationName] as InsightMatrixComparisonDataConfiguration)}
                    goodValueIndicator={args.useGoodValueIndicator ? faStar : undefined}
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<InsightMatrixStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'preview',
        daysToCompute: 28,
        groupByDataConfigurationName: 'mood',
        comparisonDataConfigurationNames: ['sleep', 'steps', 'mindful', 'therapy'],
        groupByHeaderBackgroundColor: undefined,
        groupByHeaderTextColor: undefined,
        goodValueBackgroundColor: undefined,
        goodValueTextColor: undefined,
        useGoodValueIndicator: false,
        otherValueBackgroundColor: undefined,
        otherValueTextColor: undefined
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
            options: ['preview', 'live']
        },
        daysToCompute: {
            name: 'days to compute',
            control: {
                type: 'number',
                min: 0,
                max: 28
            }
        },
        groupByDataConfigurationName: {
            name: 'group-by data',
            control: 'radio',
            options: ['mood', 'sleep', 'steps', 'mindful', 'therapy']
        },
        comparisonDataConfigurationNames: {
            name: 'comparison data',
            control: 'check',
            options: ['mood', 'sleep', 'steps', 'mindful', 'therapy']
        },
        groupByHeaderBackgroundColor: {
            name: 'group-by header background color',
            control: 'color'
        },
        groupByHeaderTextColor: {
            name: 'group-by header text color',
            control: 'color'
        },
        goodValueBackgroundColor: {
            name: 'good value background color',
            control: 'color'
        },
        goodValueTextColor: {
            name: 'good value text color',
            control: 'color'
        },
        useGoodValueIndicator: {
            name: 'good value indicator?'
        },
        otherValueBackgroundColor: {
            name: 'other value background color',
            control: 'color'
        },
        otherValueTextColor: {
            name: 'other value text color',
            control: 'color'
        },
        ...argTypesToHide(['preview', 'groupByDataConfiguration', 'comparisonDataConfigurations', 'goodValueIndicator', 'innerRef'])
    }
};

function createMoodRatingDataConfiguration(): InsightMatrixGroupByDataConfiguration | InsightMatrixComparisonDataConfiguration {
    return {
        label: 'Mood Rating',
        rawDataType: { surveyName: 'Mood Survey', stepIdentifier: 'Mood Rating' },
        thresholds: [
            { label: 'High', minimumValue: 8 },
            { label: 'Medium', minimumValue: 6 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: 'avg rating',
        valueCalculator: createAverageValueInsightMatrixValueCalculator(),
        valueFormatter: createIntegerInsightMatrixValueFormatter(),
        valueEvaluator: createMinMaxInsightMatrixValueEvaluator(8)
    };
}

function createSleepDataConfiguration(): InsightMatrixGroupByDataConfiguration | InsightMatrixComparisonDataConfiguration {
    return {
        label: 'Sleep',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: [
            { label: 'High', minimumValue: 420 },
            { label: 'Medium', minimumValue: 360 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: 'avg per night',
        valueCalculator: createAverageValueInsightMatrixValueCalculator(),
        valueFormatter: createMinutesToHoursInsightMatrixValueFormatter(),
        valueEvaluator: createMinMaxInsightMatrixValueEvaluator(420, 600)
    };
}

function createStepsDataConfiguration(): InsightMatrixGroupByDataConfiguration | InsightMatrixComparisonDataConfiguration {
    return {
        label: 'Steps',
        rawDataType: DailyDataType.Steps,
        thresholds: [
            { label: 'High', minimumValue: 6000 },
            { label: 'Medium', minimumValue: 4000 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: 'avg per day',
        valueCalculator: createAverageValueInsightMatrixValueCalculator(),
        valueFormatter: createShrinkThousandsInsightMatrixValueFormatter(),
        valueEvaluator: createMinMaxInsightMatrixValueEvaluator(6000)
    };
}

function createMindfulDataConfiguration(): InsightMatrixGroupByDataConfiguration | InsightMatrixComparisonDataConfiguration {
    return {
        label: 'Mindful Activity',
        rawDataType: DailyDataType.MindfulMinutes,
        thresholds: [
            { label: 'High', minimumValue: 60 },
            { label: 'Medium', minimumValue: 30 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: '% of days',
        valueCalculator: createPercentageOfDaysInsightMatrixValueCalculator(),
        valueFormatter: createIntegerInsightMatrixValueFormatter('%'),
        valueEvaluator: createMinMaxInsightMatrixValueEvaluator(0)
    };
}

function createTherapyDataConfiguration(): InsightMatrixGroupByDataConfiguration | InsightMatrixComparisonDataConfiguration {
    return {
        label: 'Therapeutic Activity',
        rawDataType: DailyDataType.TherapyMinutes,
        thresholds: [
            { label: 'High', minimumValue: 60 },
            { label: 'Medium', minimumValue: 30 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: '% of days',
        valueCalculator: createPercentageOfDaysInsightMatrixValueCalculator(),
        valueFormatter: createIntegerInsightMatrixValueFormatter('%'),
        valueEvaluator: createMinMaxInsightMatrixValueEvaluator(0)
    };
}