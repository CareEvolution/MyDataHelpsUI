import React from "react"
import ConnectGarmin, { ConnectGarminProps } from "./ConnectGarmin"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Description } from "@storybook/blocks";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof ConnectGarmin> = {
	title: "Container/ConnectGarmin",
	component: ConnectGarmin,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	}
};

export default meta;
type Story = StoryObj<typeof ConnectGarmin>;

const render = (args: ConnectGarminProps) => <Layout>
	<Card>
		<ConnectGarmin {...args} />
	</Card>
</Layout>;

export const NotConnected: Story = {
	args: { previewState: "notConnected", title: "Garmin" },
	render: render
}

export const Unauthorized: Story = {
	args: { previewState: "unauthorized", title: "Garmin" },
	render: render
}

export const ConnectionError: Story = {
	args: { previewState: "error", title: "Garmin" },
	render: render
}

export const FetchComplete: Story = {
	args: { previewState: "fetchComplete", title: "Garmin" },
	render: render
}

export const FetchingData: Story = {
	args: { previewState: "fetchingData", title: "Garmin" },
	render: render
}

export const NotEnabledDefault: Story = {
	args: { previewState: "notEnabled", title: "Garmin" },
	render: render
}

export const NotEnabledHide: Story = {
	args: { previewState: "notEnabled", title: "Garmin", disabledBehavior: "hide" },
	render: render
}

export const NotEnabledDisplayError: Story = {
	args: { previewState: "notEnabled", title: "Garmin", disabledBehavior: "displayError" },
	render: render
}

export const HideConnected: Story = {
	args: { previewState: "fetchComplete", hideWhenConnected: true },
	render: render
}