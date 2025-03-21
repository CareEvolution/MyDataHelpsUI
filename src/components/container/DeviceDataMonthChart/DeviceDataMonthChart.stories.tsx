import React from "react"
import DeviceDataMonthChart, { DeviceDataMonthChartProps } from "./DeviceDataMonthChart"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DailyDataType } from "../../../helpers"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof DeviceDataMonthChart> = {
	title: "Container/DeviceDataMonthChart",
	component: DeviceDataMonthChart,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof DeviceDataMonthChart>;

const render = (args: DeviceDataMonthChartProps) =>
	<Layout colorScheme="auto">
		<Card>
			<DeviceDataMonthChart {...args} />
		</Card>
	</Layout>;

const baseArgs: DeviceDataMonthChartProps = {
	previewState: "Loading",
	title: "Steps",
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	lines: [{
		showAverage: true,
		dailyDataType: DailyDataType.FitbitSteps,
		label: "Steps"
	}],
	syncId: "Fitbit"
};

export const Loading: Story = {
	args: {...baseArgs},
	render: render
}

export const FitbitSteps : Story = {
	args: {...baseArgs, previewState : "WithData"},
	render: render
}
export const NoData : Story = {
	args: {...baseArgs, previewState : "NoData"},
	render: render
}