import React from 'react';
import GlucoseChart, { GlucoseChartProps } from './GlucoseChart';
import { Card, DateRangeCoordinator, Layout } from '../../presentational';
import { GlucoseChartPreviewState } from './GlucoseChart.previewData';
import { MealCoordinator } from '../../container';

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

const render = (args: GlucoseChartStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <DateRangeCoordinator intervalType='Day' variant='rounded'>
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
        </DateRangeCoordinator>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        state: 'with data',
        withMeals: true,
        showStats: true
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
            options: ['loading', 'no data', 'with data']
        },
        withMeals: {
            name: 'with meals'
        },
        showStats: {
            name: 'show stats'
        }
    },
    render: render
};

