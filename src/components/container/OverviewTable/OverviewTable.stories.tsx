import React from 'react'
import OverviewTable from './OverviewTable'
import { Card, Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { createAverageValueOverviewValueCalculator, createIntegerOverviewValueFormatter, createMinMaxOverviewValueEvaluator, createMinutesToHoursOverviewValueFormatter, createPercentageOfDaysOverviewValueCalculator, createShrinkThousandsOverviewValueFormatter, DailyDataType, OverviewDataType, PrimaryOverviewDataType, SecondaryOverviewDataType } from '../../../helpers';

type OverviewDataTypeName = 'mood' | 'sleep' | 'steps' | 'active';

type OverviewTableStoryArgs = React.ComponentProps<typeof OverviewTable> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'preview' | 'live';
    primaryDataTypeName: OverviewDataTypeName;
    secondaryDataTypeNames: OverviewDataTypeName[];
    useGoodValueIndicator: boolean;
};

const dataTypes: Record<OverviewDataTypeName, OverviewDataType> = {
    'mood': createMoodRatingDataType(),
    'sleep': createSleepDataType(),
    'steps': createStepsDataType(),
    'active': createActiveDataType()
};

const getPrimaryLabel = (typeName: OverviewDataTypeName) => {
    switch (typeName) {
        case 'mood':
            return 'When mood rating was...';
        case 'sleep':
            return 'When sleep time was...';
        case 'steps':
            return 'When steps were...';
        case 'active':
            return 'When active time was...';
    }
};

const meta: Meta<OverviewTableStoryArgs> = {
    title: 'Container/OverviewTable',
    component: OverviewTable,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <OverviewTable
                    {...args}
                    preview={args.previewState === 'preview'}
                    primaryDataType={{
                        ...dataTypes[args.primaryDataTypeName] as PrimaryOverviewDataType,
                        label: getPrimaryLabel(args.primaryDataTypeName)
                    }}
                    secondaryDataTypes={args.secondaryDataTypeNames.map(typeName => dataTypes[typeName] as SecondaryOverviewDataType)}
                    goodValueIndicator={args.useGoodValueIndicator ? faStar : undefined}
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<OverviewTableStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'preview',
        daysToCompute: 28,
        primaryDataTypeName: 'mood',
        secondaryDataTypeNames: ['mood', 'sleep', 'steps', 'active'],
        primaryHeaderBackgroundColor: undefined,
        primaryHeaderTextColor: undefined,
        goodValueBackgroundColor: undefined,
        goodValueTextColor: undefined,
        useGoodValueIndicator: false,
        notGoodValueBackgroundColor: undefined,
        notGoodValueTextColor: undefined
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
        primaryDataTypeName: {
            name: 'primary data type',
            control: 'radio',
            options: ['mood', 'sleep', 'steps', 'active']
        },
        secondaryDataTypeNames: {
            name: 'secondary data types',
            control: 'check',
            options: ['mood', 'sleep', 'steps', 'active']
        },
        primaryHeaderBackgroundColor: {
            name: 'primary header background color',
            control: 'color'
        },
        primaryHeaderTextColor: {
            name: 'primary header text color',
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
        notGoodValueBackgroundColor: {
            name: 'not good value background color',
            control: 'color'
        },
        notGoodValueTextColor: {
            name: 'not good value text color',
            control: 'color'
        },
    }
};

function createMoodRatingDataType(): PrimaryOverviewDataType | SecondaryOverviewDataType {
    return {
        label: 'Mood Rating',
        rawDataType: { surveyName: 'Mood Survey', stepIdentifier: 'Mood Rating' },
        thresholds: [
            { label: 'High', minimumValue: 8 },
            { label: 'Medium', minimumValue: 6 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: 'avg rating',
        valueCalculator: createAverageValueOverviewValueCalculator(),
        valueFormatter: createIntegerOverviewValueFormatter(),
        valueEvaluator: createMinMaxOverviewValueEvaluator(8)
    };
}

function createSleepDataType(): PrimaryOverviewDataType | SecondaryOverviewDataType {
    return {
        label: 'Sleep',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: [
            { label: 'High', minimumValue: 420 },
            { label: 'Medium', minimumValue: 360 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: 'avg per night',
        valueCalculator: createAverageValueOverviewValueCalculator(),
        valueFormatter: createMinutesToHoursOverviewValueFormatter(),
        valueEvaluator: createMinMaxOverviewValueEvaluator(420, 600)
    };
}

function createStepsDataType(): PrimaryOverviewDataType | SecondaryOverviewDataType {
    return {
        label: 'Steps',
        rawDataType: DailyDataType.Steps,
        thresholds: [
            { label: 'High', minimumValue: 6000 },
            { label: 'Medium', minimumValue: 4000 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: 'avg per day',
        valueCalculator: createAverageValueOverviewValueCalculator(),
        valueFormatter: createShrinkThousandsOverviewValueFormatter(),
        valueEvaluator: createMinMaxOverviewValueEvaluator(6000)
    };
}

function createActiveDataType(): PrimaryOverviewDataType | SecondaryOverviewDataType {
    return {
        label: 'Active',
        rawDataType: DailyDataType.FitbitActiveMinutes,
        thresholds: [
            { label: 'High', minimumValue: 60 },
            { label: 'Medium', minimumValue: 30 },
            { label: 'Low', minimumValue: 0 }
        ],
        units: '% of days',
        valueCalculator: createPercentageOfDaysOverviewValueCalculator(),
        valueFormatter: createIntegerOverviewValueFormatter('%'),
        valueEvaluator: createMinMaxOverviewValueEvaluator(0)
    };
}