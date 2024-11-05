import React from 'react'
import OverviewTable from './OverviewTable'
import { Card, Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { createAverageValueOverviewValueCalculator, createIntegerOverviewValueFormatter, createMinMaxOverviewValueEvaluator, createMinutesToHoursOverviewValueFormatter, createPercentageOfDaysOverviewValueCalculator, createShrinkThousandsOverviewValueFormatter, DailyDataType, OverviewDataType, PrimaryOverviewDataType, SecondaryOverviewDataType } from '../../../helpers';

type OverviewDataTypeName = 'mood' | 'sleep' | 'steps' | 'mindful' | 'therapy';

type OverviewTableStoryArgs = React.ComponentProps<typeof OverviewTable> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'preview' | 'live';
    primaryDataTypeName: OverviewDataTypeName;
    secondaryDataTypeNames: OverviewDataTypeName[];
    useGoodValueIndicator: boolean;
};

const dataTypes: Record<OverviewDataTypeName, OverviewDataType> = {
    'mood': createMoodRatingDataType(),
    'sleep': createSleepOverviewDataType(),
    'steps': createStepsOverviewDataType(),
    'mindful': createMindfulOverviewDataType(),
    'therapy': createTherapyOverviewDataType()
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
                        label: `When ${dataTypes[args.primaryDataTypeName].label!.toLowerCase()} ${args.primaryDataTypeName.endsWith('s') ? 'were' : 'was'}...`
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
        primaryDataTypeName: 'mood',
        secondaryDataTypeNames: ['mood', 'sleep', 'steps', 'mindful', 'therapy'],
        useGoodValueIndicator: false
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
        primaryDataTypeName: {
            name: 'primary data type',
            control: 'radio',
            options: ['mood', 'sleep', 'steps', 'mindful', 'therapy']
        },
        secondaryDataTypeNames: {
            name: 'secondary data types',
            control: 'check',
            options: ['mood', 'sleep', 'steps', 'mindful', 'therapy']
        },
        useGoodValueIndicator: {
            name: 'good value indicator?'
        }
    }
};

function createMoodRatingDataType() {
    return {
        label: 'Mood Rating',
        rawDataType: { surveyName: 'Mood Survey', stepIdentifier: 'Mood Rating' },
        thresholds: [
            { label: 'High', min: 8 },
            { label: 'Medium', min: 6 },
            { label: 'Low', min: 0 }
        ],
        units: 'avg rating',
        secondaryValueCalculator: createAverageValueOverviewValueCalculator(),
        secondaryValueFormatter: createIntegerOverviewValueFormatter(),
        secondaryValueEvaluator: createMinMaxOverviewValueEvaluator(8)
    };
}

function createSleepOverviewDataType() {
    return {
        label: 'Sleep',
        rawDataType: DailyDataType.SleepMinutes,
        thresholds: [
            { label: 'High', min: 420 },
            { label: 'Medium', min: 360 },
            { label: 'Low', min: 0 }
        ],
        units: 'avg per night',
        secondaryValueCalculator: createAverageValueOverviewValueCalculator(),
        secondaryValueFormatter: createMinutesToHoursOverviewValueFormatter(),
        secondaryValueEvaluator: createMinMaxOverviewValueEvaluator(420, 600)
    };
}

function createStepsOverviewDataType() {
    return {
        label: 'Steps',
        rawDataType: DailyDataType.Steps,
        thresholds: [
            { label: 'High', min: 6000 },
            { label: 'Medium', min: 4000 },
            { label: 'Low', min: 0 }
        ],
        units: 'avg per day',
        secondaryValueCalculator: createAverageValueOverviewValueCalculator(),
        secondaryValueFormatter: createShrinkThousandsOverviewValueFormatter(),
        secondaryValueEvaluator: createMinMaxOverviewValueEvaluator(6000)
    };
}

function createMindfulOverviewDataType() {
    return {
        label: 'Mindful Activity',
        rawDataType: DailyDataType.MindfulMinutes,
        thresholds: [
            { label: 'High', min: 60 },
            { label: 'Medium', min: 30 },
            { label: 'Low', min: 0 }
        ],
        units: '% of days',
        secondaryValueCalculator: createPercentageOfDaysOverviewValueCalculator(),
        secondaryValueFormatter: createIntegerOverviewValueFormatter('%'),
        secondaryValueEvaluator: createMinMaxOverviewValueEvaluator(0)
    };
}

function createTherapyOverviewDataType() {
    return {
        label: 'Therapeutic Activity',
        rawDataType: DailyDataType.MindfulMinutes,
        thresholds: [
            { label: 'High', min: 60 },
            { label: 'Medium', min: 30 },
            { label: 'Low', min: 0 }
        ],
        units: '% of days',
        secondaryValueCalculator: createPercentageOfDaysOverviewValueCalculator(),
        secondaryValueFormatter: createIntegerOverviewValueFormatter('%'),
        secondaryValueEvaluator: createMinMaxOverviewValueEvaluator(0)
    };
}