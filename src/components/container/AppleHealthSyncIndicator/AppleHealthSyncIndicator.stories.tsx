import React from 'react';
import AppleHealthSyncIndicator from './AppleHealthSyncIndicator';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';

type AppleHealthSyncIndicatorStoryArgs = React.ComponentProps<typeof AppleHealthSyncIndicator> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<AppleHealthSyncIndicatorStoryArgs> = {
    title: 'Container/AppleHealthSyncIndicator',
    component: AppleHealthSyncIndicator,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <AppleHealthSyncIndicator {...args} />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<AppleHealthSyncIndicatorStoryArgs>;

const argTypes = {
    colorScheme: {
        name: 'color scheme',
        control: 'radio',
        options: ['auto', 'light', 'dark']
    },
    previewState: {
        name: 'state',
        control: 'radio',
        options: ['syncing', 'syncComplete', 'notSyncing']
    },
    hideMessage: {
        name: 'hide message',
        control: 'boolean'
    },
    alwaysDisplay: {
        name: 'always display',
        control: 'boolean'
    }
};

export const Syncing: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'syncing',
        hideMessage: false
    },
    argTypes
};

export const IconOnly: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'syncing',
        hideMessage: true
    },
    argTypes
};

export const NotSyncing: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'notSyncing'
    },
    argTypes
};

export const AlwaysDisplaySyncComplete: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'syncComplete',
        alwaysDisplay: true
    },
    argTypes
};

export const AlwaysDisplayLastSynced: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'notSyncing',
        alwaysDisplay: true
    },
    argTypes
};

export const Live: Story = {
    args: {
        colorScheme: 'auto'
    },
    argTypes
};
