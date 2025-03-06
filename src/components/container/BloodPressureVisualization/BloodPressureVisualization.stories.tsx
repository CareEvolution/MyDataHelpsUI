import React from "react"
import BloodPressureVisualization, { BloodPressureVisualizationProps } from "./BloodPressureVisualization"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { SurveyBloodPressureDataParameters } from "../../../helpers/blood-pressure-data-providers/survey-blood-pressure-data-provider"
import { DateRangeCoordinator } from "../../presentational"

export default {
	title: "Container/BloodPressureVisualization",
	component: BloodPressureVisualization,
	parameters: {
		layout: 'fullscreen',
	}
};

const render = (args: BloodPressureVisualizationProps) => <Layout colorScheme='auto'>
	<Card>
		<DateRangeCoordinator intervalType={'Week'} weekStartsOn="Monday">
			<BloodPressureVisualization {...args} />
		</DateRangeCoordinator>
	</Card>
</Layout>;


const bpSurveyParams: SurveyBloodPressureDataParameters = {
	surveyName: "Blood Pressure Readings",
	dateResultIdentifier: "Date of BP",
	systolicResultIdentifier: "Systolic BP",
	diastolicResultIdentifier: "Diastolic BP"
}

export const Default = {
	args: {
		previewState: "Default",
		surveyDataSource: bpSurveyParams
	},
	render: render
};

export const Loading = {
	args: {
		previewState: "Loading",
		surveyDataSource: bpSurveyParams
	},
	render: render
};

export const NoData = {
	args: {
		previewState: "NoData",
		surveyDataSource: bpSurveyParams
	},
	render: render
};

export const Live = {
	args: {
		surveyDataSource: {
			surveyName: "BloodPressure",
			dateResultIdentifier: "Date of BP",
			systolicResultIdentifier: "Systolic BP",
			diastolicResultIdentifier: "Diastolic BP"
		},
		deviceDataSource: ["AppleHealth", "GoogleFit", "Omron"]
	},
	render: render
};


const renderMinimal = (args: BloodPressureVisualizationProps) => <Layout colorScheme='auto'>
	<Card>
		<BloodPressureVisualization {...args} />
	</Card>
</Layout>;

export const Minimal = {
	args: {
		surveyDataSource: bpSurveyParams,
		variant: "minimal",
		weekStartsOn: "6DaysAgo",
		deviceDataSource: ["AppleHealth", "GoogleFit", "Omron"],
		onClick: () => { }
	},
	render: renderMinimal
};

