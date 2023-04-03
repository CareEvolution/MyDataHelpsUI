import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SparkBarChart, { SparkBarChartProps } from "./SparkBarChart";
import Layout from "../Layout"
import { Card } from "..";

export default {
	title: "Presentational/SparkBarChart",
	component: SparkBarChart,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof SparkBarChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SparkBarChart> = (args: SparkBarChartProps) =>
	<Layout  colorScheme="auto">
		<div style={{ width: "300px" }}>
			<SparkBarChart {...args} />
		</div>
	</Layout>;

export const Default = Template.bind({});
Default.args = {
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
}