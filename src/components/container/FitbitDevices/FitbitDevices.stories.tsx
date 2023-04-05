import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import FitbitDevices, { FitbitDevicesProps } from "./FitbitDevices"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/FitbitDevices",
	component: FitbitDevices,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof FitbitDevices>;

const Template: ComponentStory<typeof FitbitDevices> = (args: FitbitDevicesProps) =>
	<Layout colorScheme="auto">
		<Card>
			<FitbitDevices {...args} />
		</Card>
	</Layout>;

export const NotEnabled = Template.bind({});
NotEnabled.args = {
	previewState: "notEnabled"
};

export const NotConnected = Template.bind({});
NotConnected.args = {
	previewState: "notConnected"
};

export const Connected = Template.bind({});
Connected.args = {
	previewState: "connected"
};