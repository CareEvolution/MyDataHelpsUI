import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import BloodPressureVisualization, { BloodPressureVisualizationProps } from "./BloodPressureVisualization"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import queryBloodPressure, { BloodPressureDataParameters } from "../../../helpers/blood-pressure-data-providers/query-blood-pressure"
import { previewBloodPressureDataPoint } from './BloodPressureVisualization.previewdata'

export default {
	title: "Container/BloodPressureVisualization",
	component: BloodPressureVisualization,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof BloodPressureVisualization>;

const Template: ComponentStory<typeof BloodPressureVisualization> = (args: BloodPressureVisualizationProps) =>
	<Layout>
		<Card>
			<BloodPressureVisualization {...args} />
		</Card>
	</Layout>;


const bpSurveyParams : BloodPressureDataParameters = {
	dataSource: "Survey",
	surveyParameters : {
		surveyName: "RESOLVE Blood Pressure Readings - OPTIONAL",
		dateOfResultId : "Date of BP",
		systolicResultId : "Systolic BP",
		diastolicResultId : "Diastolic BP"
	}
}

export const WithData = Template.bind({});
WithData.args = {
	previewState : "WithData",
	dataParameters: bpSurveyParams,
	previewDataProvider: (bpSurveyParams) => {
		return Promise.resolve(previewBloodPressureDataPoint);
	}
};

export const Loading = Template.bind({});
Loading.args = {
	previewState : "Loading",
	dataParameters: bpSurveyParams,
	previewDataProvider: (bpSurveyParams) => {
		return Promise.resolve([]);
	}
};

export const NoData = Template.bind({});
NoData.args = {
	previewState: "NoData",
	dataParameters: bpSurveyParams,
	previewDataProvider: (bpSurveyParams) => {
		return Promise.resolve([]);
	}
};

export const Live = Template.bind({});
Live.args = {
	previewState: "Live",
	dataParameters: bpSurveyParams,
	previewDataProvider: (bpSurveyParams) => {
		return queryBloodPressure(bpSurveyParams);
	}
};