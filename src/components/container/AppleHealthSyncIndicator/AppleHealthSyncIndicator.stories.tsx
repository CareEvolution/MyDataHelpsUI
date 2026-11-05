import React from 'react';
import AppleHealthSyncIndicator from './AppleHealthSyncIndicator';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';

type AppleHealthSyncIndicatorStoryArgs = React.ComponentProps<typeof AppleHealthSyncIndicator>;

const meta: Meta<AppleHealthSyncIndicatorStoryArgs> = {
    title: 'Container/AppleHealthSyncIndicator',
    component: AppleHealthSyncIndicator,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => {
        return <Layout colorScheme="auto">
            <Card>
                <AppleHealthSyncIndicator {...args} />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<AppleHealthSyncIndicatorStoryArgs>;

const argTypes = {
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
    },
    syncingText: {
        name: 'syncing text',
        control: 'text'
    },
    syncCompleteText: {
        name: 'sync complete text',
        control: 'text'
    },
    lastFullSyncText: {
        name: 'last full sync text',
        control: 'text'
    }
};

export const Syncing: Story = {
    args: {
        previewState: 'syncing',
        hideMessage: false
    },
    argTypes
};

export const IconOnly: Story = {
    args: {
        previewState: 'syncing',
        hideMessage: true
    },
    argTypes
};

export const NotSyncing: Story = {
    args: {
        previewState: 'notSyncing'
    },
    argTypes
};

export const AlwaysDisplaySyncComplete: Story = {
    args: {
        previewState: 'syncComplete',
        alwaysDisplay: true
    },
    argTypes
};

export const AlwaysDisplayLastSynced: Story = {
    args: {
        previewState: 'notSyncing',
        alwaysDisplay: true
    },
    argTypes
};

export const Live: Story = {
    argTypes
};

export const CustomLabels: Story = {
    args: {
        previewState: 'syncing',
        alwaysDisplay: true,
        syncingText: 'Updating your Apple Health data...',
        syncCompleteText: 'Apple Health data is up to date',
        lastFullSyncText: 'Apple Health data last updated:'
    },
    argTypes
};
