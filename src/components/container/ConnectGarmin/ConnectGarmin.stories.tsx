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
NotConnected.args = { previewState: "notConnected" };

export const Unauthorized = Template.bind({});
Unauthorized.args = { previewState: "unauthorized" };

export const FetchComplete = Template.bind({});
FetchComplete.args = { previewState: "fetchComplete" };

export const FetchingData = Template.bind({});
FetchingData.args = { previewState: "fetchingData" };