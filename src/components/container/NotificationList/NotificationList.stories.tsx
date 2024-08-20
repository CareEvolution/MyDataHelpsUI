import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { NotificationList, NotificationListProps } from "./NotificationList"
import Layout from "../../presentational/Layout"
import { Card } from "../../presentational"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof NotificationList> = {
	title: "Container/NotificationList",
	component: NotificationList,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args: NotificationListProps) => {
	return <Layout colorScheme='auto'>
		<Card>
			<NotificationList {...args} />
		</Card>
	</Layout>;
};

export const Default: Story = {
	args: {
		previewState: "Default",
		notificationType: undefined
	},
	argTypes: {
		notificationType: {
			name: 'Notification Type Filter',
			control: 'select',
			options: [undefined, 'Email', 'Push', 'Sms']
		}
	},
	render: render
};

export const NoData: Story = {
	args: {
		previewState: "NoData"
	},
	render: render
};

export const Live: Story = {
	args: {
		notificationType: undefined
	},
	argTypes: {
		notificationType: {
			name: 'Notification Type Filter',
			control: 'select',
			options: [undefined, 'Email', 'Push', 'Sms']
		}
	},
	render: render
};

