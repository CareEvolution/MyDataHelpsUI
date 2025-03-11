import React from 'react';
import GlucoseChart, { GlucoseChartProps } from './GlucoseChart';
import { Card, DateRangeTitle, Layout } from '../../presentational';
import { GlucoseChartPreviewState } from './GlucoseChart.previewData';
import { GlucoseDayCoordinator, MealCoordinator } from '../../container';

export default {
    title: 'Container/GlucoseChart',
    component: GlucoseChart,
    parameters: { layout: 'fullscreen' }
};

interface GlucoseChartStoryArgs extends GlucoseChartProps {
    colorScheme: 'auto' | 'light' | 'dark';
    state: GlucoseChartPreviewState | 'live';
    withMeals: true;
}

const sharedArgTypes = {
    colorScheme: {
        name: 'color scheme',
        control: { type: 'radio' as const },
        options: ['auto', 'light', 'dark']
    },
    state: {
        name: 'state',
        control: { type: 'radio' as const },
        options: ['loading', 'no data', 'with data', 'live']
    },
    withMeals: {
        name: 'with meals'
    },
    showStats: {
        name: 'show stats'
    },
    averageGlucoseLineColor: {
        name: 'average glucose line color',
        control: { type: 'color' as const }
    }
};

const render = (args: GlucoseChartStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <GlucoseDayCoordinator previewState={args.state !== 'live' ? 'all data' : undefined}>
            <DateRangeTitle defaultMargin />
            {!args.withMeals &&
                <Card>
                    <GlucoseChart {...args} previewState={args.state !== 'live' ? args.state as GlucoseChartPreviewState : undefined} />
                </Card>
            }
            {args.withMeals &&
                <MealCoordinator previewState={args.state !== 'live' ? 'with data' : undefined}>
                    <Card>
                        <GlucoseChart {...args} previewState={args.state !== 'live' ? args.state as GlucoseChartPreviewState : undefined} />
                    </Card>
                </MealCoordinator>
            }
        </GlucoseDayCoordinator>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        state: 'with data',
        withMeals: true,
        showStats: true,
        averageGlucoseLineColor: undefined
    },
    argTypes: sharedArgTypes,
    render: render
};

export const Live = {
    args: {
        colorScheme: 'auto',
        state: 'live',
        withMeals: true,
        showStats: true,
        averageGlucoseLineColor: undefined
    },
    argTypes: sharedArgTypes,
    render: render
};
