import React from 'react';
import { Card, Layout } from '../../presentational';
import GlucoseStats, { GlucoseStatsProps } from './GlucoseStats';
import { Reading } from '../../../helpers';

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
                glucoseReadings={args.previewState === 'with data' ? [{ value: 61 }, { value: 70 }, { value: 153 }] as Reading[] : []}
                steps={args.previewState === 'with data' ? [{ value: 4365 }] as Reading[] : []}
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