import React from 'react';
import GlucoseChart, { GlucoseChartProps } from './GlucoseChart';
import { Card, DateRangeTitle, Layout, MealLog } from '../../presentational';
import { GlucoseChartPreviewState } from './GlucoseChart.previewData';
import { GlucoseDayCoordinator, MealCoordinator } from '../../container';
import { noop } from '../../../helpers/functions';

export default {
    title: 'Container/GlucoseChart',
    component: GlucoseChart,
    parameters: { layout: 'fullscreen' }
};

interface GlucoseChartStoryArgs extends GlucoseChartProps {
    colorScheme: 'auto' | 'light' | 'dark';
    state: GlucoseChartPreviewState | 'live';
    withMeals: boolean;
    clickable: boolean;
}

const render = (args: GlucoseChartStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <GlucoseDayCoordinator previewState={args.state !== 'live' ? 'all data' : undefined}>
            <DateRangeTitle defaultMargin />
            {!args.withMeals &&
                <Card>
                    <GlucoseChart
                        {...args}
                        previewState={args.state !== 'live' ? args.state as GlucoseChartPreviewState : undefined}
                        onClick={args.clickable ? noop : undefined}
                    />
                </Card>
            }
            {args.withMeals &&
                <MealCoordinator previewState={args.state !== 'live' ? 'with data' : undefined}>
                    <Card>
                        <GlucoseChart
                            {...args}
                            previewState={args.state !== 'live' ? args.state as GlucoseChartPreviewState : undefined}
                            onClick={args.clickable ? noop : undefined}
                        />
                    </Card>
                    <Card>
                        <MealLog preview={true} showMealNumbers={true} highlightSelectedMeal={true} onEditMeal={noop} />
                    </Card>
                </MealCoordinator>
            }
        </GlucoseDayCoordinator>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        variant: 'default',
        state: 'with data',
        withMeals: true,
        showStats: true,
        clickable: false,
        glucoseLineColor: undefined,
        averageGlucoseLineColor: undefined,
        emptyText: '',
        hideIfNoData: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        variant: {
            name: 'variant',
            control: 'radio',
            options: ['default', 'minimal']
        },
        state: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'no data', 'with gap in data', 'with partial data', 'with data', 'live']
        },
        withMeals: {
            name: 'with meals'
        },
        showStats: {
            name: 'show stats'
        },
        clickable: {
            name: 'clickable'
        },
        glucoseLineColor: {
            name: 'glucose line color',
            control: 'color'
        },
        averageGlucoseLineColor: {
            name: 'average glucose line color',
            control: 'color'
        },
        emptyText: {
            name: 'empty text',
            control: 'text',
            mapping: {
                '': undefined
            }
        },
        hideIfNoData: {
            name: 'hide if no data'
        }
    },
    render: render
};

