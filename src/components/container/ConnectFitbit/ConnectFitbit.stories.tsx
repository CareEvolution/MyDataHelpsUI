import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import ConnectFitbit, { ConnectFitbitProps } from "./ConnectFitbit"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/ConnectFitbit",
	component: ConnectFitbit,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof ConnectFitbit>;

const Template: ComponentStory<typeof ConnectFitbit> = (args: ConnectFitbitProps) =>
	<Layout colorScheme="auto">
		<Card>
			<ConnectFitbit {...args} />
		</Card>
	</Layout>;

export const NotConnected = Template.bind({});
NotConnected.args = { previewState: "notConnected", title: "Fitbit" };

export const Unauthorized = Template.bind({});
Unauthorized.args = { previewState: "unauthorized", title: "Fitbit" };

export const FetchComplete = Template.bind({});
FetchComplete.args = { previewState: "fetchComplete", title: "Fitbit" };

export const FetchingData = Template.bind({});
FetchingData.args = { previewState: "fetchingData", title: "Fitbit" };

export const NotEnabledDefault = Template.bind({});
NotEnabledDefault.args = { previewState: "notEnabled", title: "Fitbit" };

export const NotEnabledHide = Template.bind({});
NotEnabledHide.args = { previewState: "notEnabled", title: "Fitbit", disabledBehavior: "hide" };

export const NotEnabledDisplayError = Template.bind({});
NotEnabledDisplayError.args = { previewState: "notEnabled", title: "Fitbit", disabledBehavior: "displayError" };

export const HideConnectedFetchComplete = Template.bind({});
HideConnectedFetchComplete.args = { previewState: "fetchComplete", title: "Fitbit", hideWhenConnected: true };

export const HideConnectedNotConnected = Template.bind({});
HideConnectedNotConnected.args = { previewState: "notConnected", title: "Fitbit", hideWhenConnected: true };

export const HideConnectedUnauthorized = Template.bind({});
HideConnectedUnauthorized.args = { previewState: "unauthorized", title: "Fitbit", hideWhenConnected: true };

export const HideConnectedFetchingData = Template.bind({});
HideConnectedFetchingData.args = { previewState: "fetchingData", title: "Fitbit", hideWhenConnected: true };
