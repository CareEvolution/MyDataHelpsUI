import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import GarminDevices, { GarminDevicesProps } from "./GarminDevices"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/GarminDevices",
	component: GarminDevices,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof GarminDevices>;

const Template: ComponentStory<typeof GarminDevices> = (args: GarminDevicesProps) =>
	<Layout>
		<Card>
			<GarminDevices {...args} />
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