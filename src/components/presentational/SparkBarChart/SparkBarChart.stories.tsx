import React from "react";
import Layout from "../Layout";
import SparkBarChart, { SparkBarChartProps } from "./SparkBarChart";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof SparkBarChart> = {
	title:  "Presentational/SparkBarChart",
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

export const Default: Story = {
	args: {
		averageFillPercent: .3,
		bars: [
			{
				barFillPercent: .5,
				color: "#f5b722"
			},
			{
				barFillPercent: .1,
				color: "#f5b722"
			},
			{
				barFillPercent: .2,
				color: "#7b88c6"
			},
			{
				barFillPercent: .7,
				color: "#7b88c6"
			},
			{
				barFillPercent: .6,
				color: "#7b88c6"
			},
			{
				barFillPercent: .8,
				color: "#e35c33"
			},
			{
				barFillPercent: .9,
				color: "#e35c33"
			}]
	},
	render: render
};