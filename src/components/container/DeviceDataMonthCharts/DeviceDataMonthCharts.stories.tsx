import React from "react"
import DeviceDataMonthCharts, { DeviceDataMonthChartsProps } from "./DeviceDataMonthCharts"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Description } from "@storybook/blocks";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof DeviceDataMonthCharts> = {
    title: "Container/DeviceDataMonthCharts",
    component: DeviceDataMonthCharts,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof DeviceDataMonthCharts>;

const render = (args: DeviceDataMonthChartsProps) => <Layout colorScheme="auto">
	<Card allowOverflow={true}>
		<DeviceDataMonthCharts {...args} />
	</Card>
</Layout>;

export const Default: Story = {
	args: {
		previewState: "Default"
	},
	render: render
}

export const NoData: Story = {
	args: {
		previewState: "NoData"
	},
	render: render
}