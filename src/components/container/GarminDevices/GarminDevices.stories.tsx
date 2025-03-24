import React from "react"
import GarminDevices, { GarminDevicesProps } from "./GarminDevices"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof GarminDevices> = {
	title: "Container/GarminDevices",
	component: GarminDevices,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	}
};

export default meta;
type Story = StoryObj<typeof GarminDevices>;

const render = (args: GarminDevicesProps) =>
	<Layout colorScheme="auto">
		<Card>
			<GarminDevices {...args} />
		</Card>
	</Layout>;

export const NotEnabled: Story = {
	args: {
		previewState: "notEnabled"
	},
	render: render
}

export const NotConnected: Story = {
	args: {
		previewState: "notConnected"
	},
	render: render
}

export const Connected: Story = {
	args: {
		previewState: "connected"
	},
	render: render
}