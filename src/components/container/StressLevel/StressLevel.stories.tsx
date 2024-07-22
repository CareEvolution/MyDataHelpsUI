import React from 'react';
import StressLevel, { StressLevelPreviewState, StressLevelProps } from './StressLevel';
import { Card, DateRangeCoordinator, Layout } from '../../presentational';

export default {
    title: 'Container/StressLevel',
    component: StressLevel,
    parameters: { layout: 'fullscreen' }
};

interface StressLevelStoryArgs extends StressLevelProps {
    colorScheme: 'auto' | 'light' | 'dark';
    state: 'live' | StressLevelPreviewState;
}

const render = (args: StressLevelStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <DateRangeCoordinator intervalType='Day'>
            <Card>
                <StressLevel {...args} previewState={args.state !== 'live' ? args.state as StressLevelPreviewState : undefined} />
            </Card>
        </DateRangeCoordinator>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        state: 'loaded'
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
            options: ['loading', 'loaded', 'live']
        }
    },
    render: render
};

