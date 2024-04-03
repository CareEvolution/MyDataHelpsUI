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

export const HideConnected = Template.bind({});
HideConnected.args = { previewState: "fetchComplete", hideWhenConnected: true };
HideConnected.argTypes = { previewState: { name: "Connection State", control: "radio", options: ["fetchComplete", "fetchingData", "unauthorized", "error"]}};
