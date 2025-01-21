import React from "react"
import DeviceDataMonthChart, { DeviceDataMonthChartProps } from "./DeviceDataMonthChart"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DailyDataType } from "../../../helpers"
import { Description } from "@storybook/blocks";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof DeviceDataMonthChart> = {
    title: "Container/DeviceDataMonthChart",
    component: DeviceDataMonthChart,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof DeviceDataMonthChart>;

const render = (args: DeviceDataMonthChartProps) => <Layout colorScheme="auto">
	<Card>
		<DeviceDataMonthChart {...args} />
	</Card>
</Layout>;

const baseArgs: DeviceDataMonthChartProps = {
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

export const Loading: Story = {
	args: { ...baseArgs, previewState: "Loading"},
	render: render
}

export const FitbitSteps: Story = {
	args: baseArgs,
	render: render
}

export const NoData: Story = {
	args: { 
		...baseArgs, 
		title: "Resting Heart Rate", 
		previewState: "NoData",
		lines: [{
			dailyDataType: DailyDataType.FitbitRestingHeartRate,
			showAverage: true,
			label: "Steps",
		}]
	},
	render: render
}