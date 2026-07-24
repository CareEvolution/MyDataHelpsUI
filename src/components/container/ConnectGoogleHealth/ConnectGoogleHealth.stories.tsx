import React from 'react'
import ConnectGoogleHealth from './ConnectGoogleHealth'
import { Card, Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';

type ConnectGoogleHealthStoryArgs = React.ComponentProps<typeof ConnectGoogleHealth> & {
    colorScheme: 'auto' | 'light' | 'dark'
};

const meta: Meta<ConnectGoogleHealthStoryArgs> = {
    title: 'Container/ConnectGoogleHealth',
    component: ConnectGoogleHealth,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <ConnectGoogleHealth title="Google Health" {...args} />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<ConnectGoogleHealthStoryArgs>;

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
