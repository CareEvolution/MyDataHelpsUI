import React from 'react'
import ConnectDexcom from './ConnectDexcom'
import { Card, Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';

type ConnectDexcomStoryArgs = React.ComponentProps<typeof ConnectDexcom> & {
    colorScheme: 'auto' | 'light' | 'dark'
};

const meta: Meta<ConnectDexcomStoryArgs> = {
    title: 'Container/ConnectDexcom',
    component: ConnectDexcom,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <ConnectDexcom title="Dexcom" {...args} />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<ConnectDexcomStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'notConnected',
        hideWhenConnected: undefined,
        disabledBehavior: undefined
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['notConnected', 'unauthorized', 'error', 'fetchComplete', 'fetchingData', 'notEnabled']
        },
        hideWhenConnected: {
            name: 'hide when connected?',
            control: 'radio',
            options: [undefined, false, true]
        },
        disabledBehavior: {
            name: 'disabled behavior',
            control: 'radio',
            options: [undefined, 'hide', 'displayError']
        }
    }
};


