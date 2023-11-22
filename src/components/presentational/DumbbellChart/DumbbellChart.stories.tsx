import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DumbbellChart, { Axis, ClosedInterval, DumbBellChartProps, DumbbellClass } from "./DumbbellChart";
import Layout from "../Layout"

export default {
	title: "Presentational/DumbbellChart",
	component: DumbbellChart,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof DumbbellChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DumbbellChart> = (args:DumbBellChartProps) =>
	<Layout colorScheme="auto">
		<DumbbellChart {...args} />
	</Layout>;


const _minDiastolic = 0;
const _maxSystolic = 250;
const yInterval : ClosedInterval = {values: [_minDiastolic, _maxSystolic]};
const axis : Axis = {yRange : yInterval, yIncrement : 50, xIncrement: (85/7)};


export const Default = Template.bind({});
Default.args = {
	axis: axis,
	dumbbells: [
		{dataPoint : {dataSet1: {values: [120, 110]}, dataSet2: {values: [180, 160]}}, xValue: "8/1", class: DumbbellClass["mdhui-dumbbell-in-range"]},
		{dataPoint : {dataSet1: {values: [75, 75]}, dataSet2: {values: [114, 114]}}, xValue: "8/31", class: DumbbellClass["mdhui-dumbbell-in-range"]},
		{dataPoint : {dataSet1: {values: [78, 78]}, dataSet2: {values: [128, 128]}}, xValue: "9/10", class: DumbbellClass["mdhui-dumbbell-out-of-range"]},
		{dataPoint : {dataSet1: {values: [75, 85]}, dataSet2: {values: [120, 135]}}, xValue: "9/29", class: DumbbellClass["mdhui-dumbbell-out-of-range"]},
		{dataPoint : {dataSet1: {values: [10, 55]}, dataSet2: {values: [300, 300]}}, xValue: "9/20", class: DumbbellClass["mdhui-dumbbell-out-of-range"]},
		{dataPoint : {dataSet1: {values: [54, 55]}, dataSet2: {values: [240, 250]}}, xValue: "12/31", class: DumbbellClass["mdhui-dumbbell-out-of-range"]},
	]
}