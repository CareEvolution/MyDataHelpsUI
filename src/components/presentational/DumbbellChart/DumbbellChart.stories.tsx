import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import DumbbellChart, { Axis, ClosedInterval, DumbBellChartProps, DumbbellClass } from "./DumbbellChart";
import Layout from "../Layout"

const meta: Meta<typeof DumbbellChart> = {
	title: "Presentational/DumbbellChart",
	component: DumbbellChart,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof DumbbellChart>;

const render = (args: DumbBellChartProps) =>
	<Layout colorScheme="auto">
		<DumbbellChart {...args} />
	</Layout>;

const _minDiastolic = 0;
const _maxSystolic = 250;
const yInterval: ClosedInterval = { values: [_minDiastolic, _maxSystolic] };
const axis: Axis = { yRange: yInterval, yIncrement: 50, xIncrement: (100 / 13) };

const data = [
	{ dataPoint: { dataSet1: { values: [-50, 25] }, dataSet2: { values: [200, 770] } }, xValue: "7/18", class: DumbbellClass["mdhui-dumbbell-in-range"] },
	{ dataPoint: { dataSet1: { values: [0, 0] }, dataSet2: { values: [250, 250] } }, xValue: "7/31", class: DumbbellClass["mdhui-dumbbell-in-range"] },
	{ dataPoint: { dataSet1: { values: [0, 50] }, dataSet2: { values: [200, 200] } }, xValue: "8/1", class: DumbbellClass["mdhui-dumbbell-in-range"] },
	{ dataPoint: { dataSet1: { values: [50, 100] }, dataSet2: { values: [150, 200] } }, xValue: "8/2", class: DumbbellClass["mdhui-dumbbell-in-range"] },
	{ dataPoint: { dataSet1: { values: [50, 150] }, dataSet2: { values: [200, 250] } }, xValue: "8/5", class: DumbbellClass["mdhui-dumbbell-out-of-range"] },
	{ dataPoint: { dataSet1: { values: [50, 50] }, dataSet2: { values: [150, 150] } }, xValue: "9/10", class: DumbbellClass["mdhui-dumbbell-in-range"] },
	{ dataPoint: { dataSet1: { values: [75, 85] }, dataSet2: { values: [120, 135] } }, xValue: "9/29", class: DumbbellClass["mdhui-dumbbell-in-range"] },
	{ dataPoint: { dataSet1: { values: [-405, 50] }, dataSet2: { values: [300, 300] } }, xValue: "9/20", class: DumbbellClass["mdhui-dumbbell-out-of-range"] },
	{ dataPoint: { dataSet1: { values: [54, 55] }, dataSet2: { values: [240, 350] } }, xValue: "12/30", class: DumbbellClass["mdhui-dumbbell-out-of-range"] },
	{ dataPoint: { dataSet1: { values: [-2, -4] }, dataSet2: { values: [340, 350] } }, xValue: "1/1", class: DumbbellClass["mdhui-dumbbell-out-of-range"] },
	{ dataPoint: { dataSet1: { values: [0, 0] }, dataSet2: { values: [240, 250] } }, xValue: "1/2", class: DumbbellClass["mdhui-dumbbell-out-of-range"] },
];

export const WithData: Story = {
	args: {
		axis: axis,
		dumbbells: data
	},
	render: render
};

export const NoData: Story = {
	args: {
		axis: axis,
		dumbbells: []
	},
	render: render
};

export const Minimal: Story = {
	args: {
		axis: axis,
		dumbbells: data,
		variant: "minimal"
	},
	render: render
};