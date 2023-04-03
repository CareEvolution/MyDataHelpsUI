import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import FitbitMonthCharts, { FitbitMonthChartsProps } from "./FitbitMonthCharts"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/FitbitMonthCharts",
	component: FitbitMonthCharts,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof FitbitMonthCharts>;

const Template: ComponentStory<typeof FitbitMonthCharts> = (args: FitbitMonthChartsProps) =>
	<Layout  colorScheme="light">
		<Card>
			<FitbitMonthCharts {...args} />
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