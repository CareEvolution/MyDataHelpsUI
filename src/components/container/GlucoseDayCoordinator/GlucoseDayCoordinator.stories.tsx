import { Meta, StoryObj } from '@storybook/react';
import React from 'react'
import { DateRangeTitle, Layout } from '../../presentational'
import GlucoseDayCoordinator from './GlucoseDayCoordinator';
import { GlucoseDayCoordinatorPreviewState } from './GlucoseDayCoordinator.previewData';
import { argTypesToHide } from '../../../../.storybook/helpers';

type GlucoseDayCoordinatorStoryArgs = React.ComponentProps<typeof GlucoseDayCoordinator> & {
    colorScheme: 'auto' | 'light' | 'dark'
    state: GlucoseDayCoordinatorPreviewState | 'live';
    minimumDateMillis: number;
};

const meta: Meta<GlucoseDayCoordinatorStoryArgs> = {
    title: 'Container/GlucoseDayCoordinator',
    component: GlucoseDayCoordinator,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <GlucoseDayCoordinator
                {...args}
                minimumDate={args.minimumDateMillis ? new Date(args.minimumDateMillis) : undefined}
                previewState={args.state !== 'live' ? args.state as GlucoseDayCoordinatorPreviewState : undefined}
            >
                <DateRangeTitle defaultMargin />
            </GlucoseDayCoordinator>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<GlucoseDayCoordinatorStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        state: 'all data',
        minimumDate: undefined
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
            options: ['no data', 'some data', 'all data', 'live']
        },
        minimumDateMillis: {
            name: 'minimum date',
            control: 'date'
        },
        ...argTypesToHide(['minimumDate'])
    }
};