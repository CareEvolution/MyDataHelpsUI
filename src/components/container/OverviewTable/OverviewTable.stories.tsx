import React from 'react'
import OverviewTable from './OverviewTable'
import { Card, Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { createMindfulOverviewDataType, createMoodRatingDataType, createSleepOverviewDataType, createStepsOverviewDataType, createTherapyOverviewDataType, OverviewDataType } from '../../../helpers';

type OverviewDataTypeName = 'mood' | 'sleep' | 'steps' | 'mindful' | 'therapy';

type OverviewTableStoryArgs = React.ComponentProps<typeof OverviewTable> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'preview' | 'live';
    primaryDataTypeName: OverviewDataTypeName;
    secondaryDataTypeNames: OverviewDataTypeName[];
    useGoodValueIndicator: boolean;
};

const dataTypes: Record<OverviewDataTypeName, OverviewDataType> = {
    'mood': createMoodRatingDataType({ surveyName: 'Mood Survey', stepIdentifier: 'Mood Rating' }),
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
                        ...dataTypes[args.primaryDataTypeName],
                        label: `When ${dataTypes[args.primaryDataTypeName].label!.toLowerCase()} ${args.primaryDataTypeName.endsWith('s') ? 'were' : 'was'}...`
                    }}
                    secondaryDataTypes={args.secondaryDataTypeNames.map(typeName => dataTypes[typeName])}
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
