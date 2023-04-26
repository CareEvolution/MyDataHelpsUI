import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import GarminMonthCharts, { GarminMonthChartsProps } from "./GarminMonthCharts"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/GarminMonthCharts",
	component: GarminMonthCharts,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof GarminMonthCharts>;

const Template: ComponentStory<typeof GarminMonthCharts> = (args: GarminMonthChartsProps) =>
	<Layout>
		<Card>
			<GarminMonthCharts {...args} />
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