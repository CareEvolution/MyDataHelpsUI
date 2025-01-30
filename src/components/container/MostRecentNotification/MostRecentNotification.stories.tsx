import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import MostRecentNotification, { MostRecentNotificationPreviewState } from './MostRecentNotification'
import Layout from '../../presentational/Layout'
import { Card } from '../../presentational'
import { argTypesToHide } from '../../../../.storybook/helpers';
import { tryParseRegex } from '../../../helpers';


type MostRecentNotificationStoryArgs = React.ComponentProps<typeof MostRecentNotification> & {
	colorScheme: 'auto' | 'light' | 'dark';
	state: MostRecentNotificationPreviewState | 'live';
	notificationIdentifierRegexString?: string;
};

const meta: Meta<MostRecentNotificationStoryArgs> = {
	title: 'Container/MostRecentNotification',
	component: MostRecentNotification,
	parameters: {
		layout: 'fullscreen'
	},
};
export default meta;

type Story = StoryObj<MostRecentNotificationStoryArgs>;

const render = (args: MostRecentNotificationStoryArgs) => {
	if (args.notificationIdentifierRegexString) {
		const { success, regex } = tryParseRegex(args.notificationIdentifierRegexString);
		if (success) {
			args.notificationIdentifierRegex = regex;
		} else {
			console.log('Invalid identifier regex.')
		}
	}

	console.log("args", args)

	return <Layout colorScheme={args.colorScheme}>
		<Card>
			<MostRecentNotification
				previewState={args.state !== 'live' ? args.state : undefined}
				{...args}
			/>
		</Card>
	</Layout>;
};

export const Default: Story = {
	args: {
		colorScheme: 'auto',
		state: "loaded with data",
		notificationType: undefined,
		notificationIdentifierRegexString: '',
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
			options: ['loading', 'loaded with data', 'loaded with no data', 'live']
		},
		notificationType: {
			name: 'type filter',
			control: {
				type: 'radio',
				labels: {
					undefined: 'None'
				}
			},
			options: [undefined, 'Email', 'Push', 'Sms']
		},
		hideAfterHours: {
			name: 'hide after hours',
			control: {
				type: 'number',
				step: 1
			}
		},
		notificationIdentifierRegexString: {
			name: 'identifier regex',
		},
		...argTypesToHide(['previewState', 'notificationIdentifierRegex', 'innerRef'])
	},
	render: render
};

