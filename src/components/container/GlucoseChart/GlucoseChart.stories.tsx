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
    withMeals: true;
    clickable: "true" | "false";
}

const render = (args: GlucoseChartStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <GlucoseDayCoordinator previewState={args.state !== 'live' ? 'all data' : undefined}>
            <DateRangeTitle defaultMargin />
            {!args.withMeals &&
                <Card>
                    <GlucoseChart {...args}
                        previewState={args.state !== 'live' ? args.state as GlucoseChartPreviewState : undefined}
                        onClick={args.clickable == "true" ? () => { } : undefined} />
                </Card>
            }
            {args.withMeals &&
                <MealCoordinator previewState={args.state !== 'live' ? 'with data' : undefined}>
                    <Card>
                        <GlucoseChart {...args}
                            previewState={args.state !== 'live' ? args.state as GlucoseChartPreviewState : undefined}
                            onClick={args.clickable == "true" ? () => { } : undefined} />
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
        state: 'with data',
        withMeals: true,
        showStats: true,
        averageGlucoseLineColor: undefined,
        variant: 'default',
        clickable: "false",
        hideIfNoData: false
    },
    argTypes: {
        variant: {
            name: 'variant',
            control: 'radio',
            options: ['default', 'minimal']
        },
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
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
        averageGlucoseLineColor: {
            name: 'average glucose line color',
            control: 'color'
        },
        clickable: {
            name: 'clickable',
            control: 'radio',
            options: ["true", "false"]
        }
    },
    render: render
};

