import React from 'react'
import ConnectOura from './ConnectOura'
import { Card, Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';

type ConnectOuraStoryArgs = React.ComponentProps<typeof ConnectOura> & {
    colorScheme: 'auto' | 'light' | 'dark'
};

const meta: Meta<ConnectOuraStoryArgs> = {
    title: 'Container/ConnectOura',
    component: ConnectOura,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <ConnectOura title="Oura" {...args} />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<ConnectOuraStoryArgs>;

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