import React from "react"
import FitbitDevices, { FitbitDevicesProps } from "./FitbitDevices"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof FitbitDevices> = {
	title: "Container/FitbitDevices",
	component: FitbitDevices,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	}
};

export default meta;
type Story = StoryObj<typeof FitbitDevices>;

const render = (args: FitbitDevicesProps) =>
	<Layout colorScheme="auto">
		<Card>
			<FitbitDevices {...args} />
		</Card>
	</Layout>;

export const NotEnabled: Story = {
	args: {
		previewState: "notEnabled"
	},
	render: render
};

export const NotConnected: Story = {
	args: {
		previewState: "notConnected"
	},
	render: render
};

export const Connected: Story = {
	args: {
		previewState: "connected"
	},
	render: render
};