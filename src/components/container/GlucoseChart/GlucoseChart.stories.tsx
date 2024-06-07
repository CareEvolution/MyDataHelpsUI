import React from 'react';
import GlucoseChart, { GlucoseChartProps } from './GlucoseChart';
import { DateRangeCoordinator, Layout } from '../../presentational';

export default {
    title: 'Container/GlucoseChart',
    component: GlucoseChart,
    parameters: {layout: 'fullscreen'}
};

interface GlucoseChartStoryArgs extends GlucoseChartProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: GlucoseChartStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <DateRangeCoordinator intervalType='Day' variant='rounded'>
            <GlucoseChart {...args} />
        </DateRangeCoordinator>
    </Layout>;
};

export const Default = {
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
            options: ['loading', 'no data', 'with data', 'with data and meals']
        }
    },
    render: render
};

