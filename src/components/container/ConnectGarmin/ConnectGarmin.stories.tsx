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

export const ConnectionError = Template.bind({});
ConnectionError.args = { previewState: "error", title: "Garmin" };

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

export const HideConnected = Template.bind({});
HideConnected.args = { previewState: "fetchComplete", hideWhenConnected: true };
HideConnected.argTypes = { previewState: { name: "Connection State", control: "radio", options: ["fetchComplete", "fetchingData", "unauthorized", "error"]}};


