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
NotConnected.args = { previewState: "notConnected" };

export const Unauthorized = Template.bind({});
Unauthorized.args = { previewState: "unauthorized" };

export const FetchComplete = Template.bind({});
FetchComplete.args = { previewState: "fetchComplete" };

export const FetchingData = Template.bind({});
FetchingData.args = { previewState: "fetchingData" };