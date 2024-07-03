import React from 'react';
import GlucoseChart, { GlucoseChartProps } from './GlucoseChart';
import { DateRangeCoordinator, Layout } from '../../presentational';
import { GlucoseChartPreviewState } from "./GlucoseChart.previewData";

export default {
    title: 'Container/GlucoseChart',
    component: GlucoseChart,
    parameters: { layout: 'fullscreen' }
};

interface GlucoseChartStoryArgs extends GlucoseChartProps {
    colorScheme: 'auto' | 'light' | 'dark';
    state: GlucoseChartPreviewState | 'live';
}

const render = (args: GlucoseChartStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <DateRangeCoordinator intervalType='Day' variant='rounded'>
            <GlucoseChart {...args} previewState={args.state !== 'live' ? args.state as GlucoseChartPreviewState : undefined} />
        </DateRangeCoordinator>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        state: 'with data and meals',
        showStats: true,
        showMeals: true
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
            options: ['loading', 'no data', 'with data', 'with data and meals', 'live']
        },
        showStats: {
            name: 'show stats'
        },
        showMeals: {
            name: 'show meals'
        }
    },
    render: render
};

