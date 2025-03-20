import React from "react"
import GarminMonthCharts, { GarminMonthChartsProps } from "./GarminMonthCharts"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof GarminMonthCharts> = {
	title: "Container/GarminMonthCharts",
	component: GarminMonthCharts,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof GarminMonthCharts>;

const render = (args: GarminMonthChartsProps) =>
	<Layout colorScheme="auto">
		<Card>
			<GarminMonthCharts {...args} />
		</Card>
	</Layout>;

export const NotEnabled: Story = {
	args: {
		previewState: "notEnabled"
	},
	render: render
}

export const NotConnected: Story = {
	args: {
		previewState: "notConnected"
	},
	render: render
}

export const Connected: Story = {
	args: {
		previewState: "connected"
	},
	render: render
}