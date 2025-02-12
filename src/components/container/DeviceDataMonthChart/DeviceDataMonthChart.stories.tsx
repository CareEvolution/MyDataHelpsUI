import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DeviceDataMonthChart, { DeviceDataMonthChartProps } from "./DeviceDataMonthChart"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DailyDataType } from "../../../helpers"

export default {
	title: "Container/DeviceDataMonthChart",
	component: DeviceDataMonthChart,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof DeviceDataMonthChart>;

const Template: ComponentStory<typeof DeviceDataMonthChart> = (args: DeviceDataMonthChartProps) =>
	<Layout colorScheme="auto">
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
		dailyDataType: DailyDataType.FitbitSteps,
		label: "Steps"
	}],
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
			dailyDataType: DailyDataType.FitbitSteps,
			label: "Steps"
		}],
	syncId: "Fitbit"
};

export const HealthConnectSteps = Template.bind({});
HealthConnectSteps.args = {
	title: "Steps",
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	lines: [{
			showAverage: true,
			dailyDataType: DailyDataType.HealthConnectSteps,
			label: "Steps"
		}],
	syncId: "HealthConnect"
};

export const HealthConnectAverageRestingHeartRate = Template.bind({});
HealthConnectAverageRestingHeartRate.args = {
	title: "Average Resting Heart Rate",
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	lines: [{
			showAverage: true,
			dailyDataType: DailyDataType.HealthConnectAverageRestingHeartRate,
			label: "Average Resting Heart Rate"
		}],
	syncId: "HealthConnect"
};

export const NoData = Template.bind({});
NoData.args = {
	title: "Resting Heart Rate",
	previewState: "NoData",
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	lines: [{
		dailyDataType: DailyDataType.FitbitRestingHeartRate,
		showAverage: true,
		label: "Steps",
	}],
	syncId: "Fitbit"
};