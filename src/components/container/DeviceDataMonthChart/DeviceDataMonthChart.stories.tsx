﻿import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DeviceDataMonthChart, { DeviceDataMonthChartProps } from "./DeviceDataMonthChart"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DefaultDailyDataType } from "../../../helpers/query-daily-data"

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
		dailyDataType: DefaultDailyDataType.FitbitSteps,
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
			dailyDataType: DefaultDailyDataType.FitbitSteps,
			label: "Steps"
		}],
	syncId: "Fitbit"
};

export const NoData = Template.bind({});
NoData.args = {
	title: "Resting Heart Rate",
	previewState: "NoData",
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	lines: [{
		dailyDataType: DefaultDailyDataType.FitbitRestingHeartRate,
		showAverage: true,
		label: "Steps",
	}],
	syncId: "Fitbit"
};