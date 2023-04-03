import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import MostRecentNotification, { MostRecentNotificationProps } from "./MostRecentNotification"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/MostRecentNotification",
	component: MostRecentNotification,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof MostRecentNotification>;

const Template: ComponentStory<typeof MostRecentNotification> = (args: MostRecentNotificationProps) =>
	<Layout  colorScheme="light">
		<Card>
			<MostRecentNotification {...args} />
		</Card>
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	previewState: "Default"
};