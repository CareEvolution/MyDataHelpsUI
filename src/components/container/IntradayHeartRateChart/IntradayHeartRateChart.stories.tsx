import React from "react";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";
import IntradayHeartRateChart, { IntradayHeartRateChartProps } from "./IntradayHeartRateChart";


export default {
	title: "Container/IntradayHeartRateChart",
	component: IntradayHeartRateChart,
	parameters: {
		layout: 'fullscreen',
	}
};

const renderDefault = (args: IntradayHeartRateChartProps) => <Layout colorScheme='auto'>
	<Card>
		<IntradayHeartRateChart {...args} />
	</Card>
</Layout>;

const renderDRC = (args: IntradayHeartRateChartProps) => <Layout colorScheme='auto'>
	<Card>
		<DateRangeCoordinator intervalType={'Day'} initialIntervalStart={new Date()}>
			<IntradayHeartRateChart {...args} />
		</DateRangeCoordinator>
	</Card>
</Layout>;

export const Default = {
    render: renderDefault,
	args: {
		previewState: "Default",
		lineColor: "green"
	},
};

export const FullDataThresholds = {
    render: renderDefault,
	args: {
		previewState: "CompleteDataWithThresholds",
		thresholds: [
			{value: 80, referenceLineColor: "green", overThresholdLineColor: "green"},
			{value: 120, referenceLineColor: "orange", overThresholdLineColor: "#ffdd21"},
			{value: 180, referenceLineColor: "red", overThresholdLineColor: "#ff0000"}
		]
	},
};

export const PartialDataThresholds = {
    render: renderDefault,
	args: {
		previewState: "PartialDataWithThresholds",
		thresholds: [
			{value: 80, referenceLineColor: "green", overThresholdLineColor: "green"},
			{value: 120, referenceLineColor: "orange", overThresholdLineColor: "#ffdd21"},
			{value: 180, referenceLineColor: "red", overThresholdLineColor: "#ff0000"}
		]
	},
};

export const NoData = {
    render: renderDefault,
	args: {
		previewState: "NoData",
	},
};

export const LiveThresholds = {
    render: renderDRC,
	args: {
		dataSource: "Fitbit",
		aggregationIntervalAmount: 5,
		aggregationIntervalType: "Minutes",
		aggregationOption: "max",
		thresholds: [
			{value: 80, referenceLineColor: "green", overThresholdLineColor: "green"},
			{value: 120, referenceLineColor: "yellow", overThresholdLineColor: "#ffdd21"},
			{value: 180, referenceLineColor: "red", overThresholdLineColor: "#ff0000"}
		]
	},
};

export const LiveDRCNoThresholds = {
    render: renderDRC,
	args: {
		dataSource: "Fitbit",
		aggregationIntervalAmount: 5,
		aggregationIntervalType: "Minutes",
		aggregationOption: "max"
	},
};