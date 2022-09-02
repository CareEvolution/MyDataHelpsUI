import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DeviceDataMonthChart, { DeviceDataMonthChartProps } from "./DeviceDataMonthChart"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/DeviceDataMonthChart",
	component: DeviceDataMonthChart,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof DeviceDataMonthChart>;

const Template: ComponentStory<typeof DeviceDataMonthChart> = (args: DeviceDataMonthChartProps) =>
	<Layout>
		<Card>
			<DeviceDataMonthChart {...args} />
		</Card>
	</Layout>;

export const Loading = Template.bind({});
Loading.args = {
	title: "Steps",
	previewState: "Loading",
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	lines: [{
		showAverage: true,
		deviceDataPointType: "Steps",
		label: "Steps",
		displayByDate: "start",
		ignoreDateOffsets: true,
		ignoreZeros: true,
		aggregation: "Average"
	}],
	namespace: "Fitbit",
	syncId: "Fitbit"
};

export const FitbitSteps = Template.bind({});
FitbitSteps.args = {
	title: "Steps",
	previewState: "WithData",
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	lines: [{
			showAverage: true,
			deviceDataPointType: "Steps",
			label: "Steps",
			displayByDate: "start",
			ignoreDateOffsets: true,
			ignoreZeros: true,
			aggregation: "Average"
		}],
	namespace: "Fitbit",
	syncId: "Fitbit"
};

export const NoData = Template.bind({});
NoData.args = {
	title: "Resting Heart Rate",
	previewState: "NoData",
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	lines: [{
		showAverage: true,
		deviceDataPointType: "Steps",
		label: "Steps",
		displayByDate: "start",
		ignoreDateOffsets: true,
		ignoreZeros: true,
		aggregation: "Average"
	}],
	namespace: "Fitbit",
	syncId: "Fitbit"
};