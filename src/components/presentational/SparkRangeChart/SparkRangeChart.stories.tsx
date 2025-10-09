import React from 'react'
import SparkRangeChart from './SparkRangeChart'
import { Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';

type SparkRangeChartStoryArgs = React.ComponentProps<typeof SparkRangeChart> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<SparkRangeChartStoryArgs> = {
    title: 'Presentational/SparkRangeChart',
    component: SparkRangeChart,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <SparkRangeChart {...args} />
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<SparkRangeChartStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        domain: [0, 100],
        ranges: [
            { min: 10, max: 80, average: 40 },
            { min: 30, max: 90, average: 70 },
            { min: 20, max: 85, average: 35 },
            { min: 25, max: 80, average: 65 },
            { min: 15, max: 75, average: 30 }
        ]
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        }
    }
};
