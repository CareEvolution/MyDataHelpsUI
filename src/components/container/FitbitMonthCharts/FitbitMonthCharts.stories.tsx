﻿import React from "react"
import FitbitMonthCharts, { FitbitMonthChartsProps } from "./FitbitMonthCharts"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FitbitMonthCharts> = {
	title: "Container/FitbitMonthCharts",
	component: FitbitMonthCharts,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof FitbitMonthCharts>;

const render = (args: FitbitMonthChartsProps) =>
	<Layout colorScheme="auto">
		<Card>
			<FitbitMonthCharts {...args} />
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