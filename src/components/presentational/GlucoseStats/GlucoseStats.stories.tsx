import React from 'react';
import { Card, Layout } from '../../presentational';
import GlucoseStats, { GlucoseStatsProps } from './GlucoseStats';
import { generateGlucose, generateSteps } from '../../../helpers';
import { startOfToday } from 'date-fns';

export default {
    title: 'Presentational/GlucoseStats',
    component: GlucoseStats,
    parameters: { layout: 'fullscreen' }
};

interface GlucoseStatsStoryArgs extends GlucoseStatsProps {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'no data' | 'with data';
}

const render = (args: GlucoseStatsStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <GlucoseStats
                {...args}
                glucoseReadings={args.previewState === 'with data' ? generateGlucose(startOfToday()) : []}
                steps={args.previewState === 'with data' ? generateSteps(startOfToday()) : []}
                sleepMinutes={args.previewState === 'with data' ? 385 : undefined}
            />
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'with data',
        loading: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'preview state',
            control: 'radio',
            options: ['no data', 'with data']
        }
    },
    render: render
};