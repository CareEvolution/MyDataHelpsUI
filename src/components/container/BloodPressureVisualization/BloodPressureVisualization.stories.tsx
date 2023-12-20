import React from "react"
import BloodPressureVisualization, { BloodPressureVisualizationProps } from "./BloodPressureVisualization"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { SurveyBloodPressureDataParameters } from "../../../helpers/blood-pressure-data-providers/survey-blood-pressure-data-provider"

export default {
	title: "Container/BloodPressureVisualization",
	component: BloodPressureVisualization,
	parameters: {
		layout: 'fullscreen',
	}
};

const render = (args: BloodPressureVisualizationProps) => <Layout colorScheme='auto'>
	<Card>
		<BloodPressureVisualization {...args} />
	</Card>
</Layout>;


const bpSurveyParams: SurveyBloodPressureDataParameters = {
	surveyName: "Blood Pressure Readings",
	dateResultIdentifier: "Date of BP",
	systolicResultIdentifier: "Systolic BP",
	diastolicResultIdentifier: "Diastolic BP"
}

export const WithData = {
	args: {
		previewState: "WithData",
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
		previewState: "Live",
		surveyDataSource: {
			surveyName: "Blood Pressure Readings - OPTIONAL",
			dateResultIdentifier: "Date of BP",
			systolicResultIdentifier: "Systolic BP",
			diastolicResultIdentifier: "Diastolic BP"
		}
	},
	render: render
};