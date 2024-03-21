import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import ConnectGarmin, { ConnectGarminProps } from "./ConnectGarmin"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/ConnectGarmin",
	component: ConnectGarmin,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof ConnectGarmin>;

const Template: ComponentStory<typeof ConnectGarmin> = (args: ConnectGarminProps) =>
	<Layout>
		<Card>
			<ConnectGarmin {...args} />
		</Card>
	</Layout>;

export const NotConnected = Template.bind({});
NotConnected.args = { previewState: "notConnected", title: "Garmin" };

export const Unauthorized = Template.bind({});
Unauthorized.args = { previewState: "unauthorized", title: "Garmin" };

export const FetchComplete = Template.bind({});
FetchComplete.args = { previewState: "fetchComplete", title: "Garmin" };

export const FetchingData = Template.bind({});
FetchingData.args = { previewState: "fetchingData", title: "Garmin" };

export const NotEnabledDefault = Template.bind({});
NotEnabledDefault.args = { previewState: "notEnabled", title: "Garmin" };

export const NotEnabledHide = Template.bind({});
NotEnabledHide.args = { previewState: "notEnabled", title: "Garmin", disabledBehavior: "hide" };

export const NotEnabledDisplayError = Template.bind({});
NotEnabledDisplayError.args = { previewState: "notEnabled", title: "Garmin", disabledBehavior: "displayError" };

export const HideConnectedNotConnected = Template.bind({});
HideConnectedNotConnected.args = { previewState: "notConnected", title: "Garmin", hideWhenConnected: true };

export const HideConnectedUnauthorized = Template.bind({});
HideConnectedUnauthorized.args = { previewState: "unauthorized", title: "Garmin", hideWhenConnected: true };

export const HideConnectedFetchComplete = Template.bind({});
HideConnectedFetchComplete.args = { previewState: "fetchComplete", title: "Garmin", hideWhenConnected: true };

export const HideConnectedFetchingData = Template.bind({});
HideConnectedFetchingData.args = { previewState: "fetchingData", title: "Garmin", hideWhenConnected: true };