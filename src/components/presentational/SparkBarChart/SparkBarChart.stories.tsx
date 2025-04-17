import React from "react";
import Layout from "../Layout";
import SparkBarChart, { SparkBarChartBar, SparkBarChartProps } from "./SparkBarChart";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SparkBarChart> = {
	title: "Presentational/SparkBarChart",
	component: SparkBarChart,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof SparkBarChart>;

const render = (args: SparkBarChartProps) => <Layout colorScheme="auto">
	<div style={{ width: "300px" }}>
		<SparkBarChart {...args} />
	</div>
</Layout>;

const bars: SparkBarChartBar[] = [
	{
		barFillPercent: .5,
		color: "#f5b722",
		opacity: .5
	},
	{
		barFillPercent: .1,
		color: "#f5b722",
		opacity: .5
	},
	{
		barFillPercent: .2,
		color: "#7b88c6",
		opacity: .5
	},
	{
		barFillPercent: .7,
		color: "#7b88c6",
		opacity: .5
	},
	{
		barFillPercent: .6,
		color: "#7b88c6",
		opacity: .5
	},
	{
		barFillPercent: .8,
		color: "#e35c33",
		opacity: .5
	},
	{
		barFillPercent: .9,
		color: "#e35c33"
	}];

export const Default: Story = {
	args: {
		averageFillPercent: .3,
		bars: bars
	},
	render: render
};

export const WithGap: Story = {
	args: {
		averageFillPercent: .3,
		gap: 4,
		bars: bars
	},
	render: render
};

export const Rounded: Story = {
	args: {
		averageFillPercent: .3,
		bars: bars,
		variant: "rounded"
	},
	render: render
};