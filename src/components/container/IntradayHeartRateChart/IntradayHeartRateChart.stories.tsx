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
		aggregationOption: "avg"
	},
};

export const FullDataThresholds = {
	render: renderDefault,
	args: {
		previewState: "CompleteDataWithThresholds",
		aggregationOption: "avg",
		thresholds: [
			{ value: 80, referenceLineColor: "green", overThresholdColor: "green" },
			{ value: 120, referenceLineColor: "orange", overThresholdColor: "#ffdd21" },
			{ value: 180, referenceLineColor: "red", overThresholdColor: "#ff0000" }
		]
	},
};

export const PartialDataThresholds = {
	render: renderDefault,
	args: {
		previewState: "PartialDataWithThresholds",
		aggregationOption: "avg",
		thresholds: [
			{ value: 80, referenceLineColor: "green", overThresholdColor: "green" },
			{ value: 120, referenceLineColor: "orange", overThresholdColor: "#ffdd21" },
			{ value: 180, referenceLineColor: "red", overThresholdColor: "#ff0000" }
		]
	},
};

export const MissingMidDayDataThresholds = {
	render: renderDefault,
	args: {
		previewState: "MissingMidDayDataThresholds",
		aggregationOption: "avg",
		thresholds: [
			{ value: 80, referenceLineColor: "green", overThresholdColor: "green" },
			{ value: 120, referenceLineColor: "orange", overThresholdColor: "#ffdd21" },
			{ value: 180, referenceLineColor: "red", overThresholdColor: "#ff0000" }
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
		dataSources: ["Fitbit", "AppleHealth"],
		aggregationOption: "max",
		aggregationIntervalMinutes: 5,
		thresholds: [
			{ value: 80, referenceLineColor: "green", overThresholdColor: "green" },
			{ value: 120, referenceLineColor: "yellow", overThresholdColor: "#ffdd21" },
			{ value: 180, referenceLineColor: "red", overThresholdColor: "#ff0000" }
		]
	},
};

export const LiveDRCNoThresholds = {
	render: renderDRC,
	args: {
		dataSources: ["Fitbit", "AppleHealth"],
		aggregationOption: "max",
		aggregationIntervalMinutes: 5,
	},
};