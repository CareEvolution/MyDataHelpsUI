import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import BloodPressureVisualization, { BloodPressureVisualizationProps } from "./BloodPressureVisualization"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { BloodPressureDataParameters } from "../../../helpers/blood-pressure-data-providers/query-blood-pressure"

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
		surveyName: "Blood Pressure Readings",
		dateOfResultId : "Date of BP",
		systolicResultId : "Systolic BP",
		diastolicResultId : "Diastolic BP"
	}
}

export const WithData = Template.bind({});
WithData.args = {
	previewState : "WithData",
	dataParameters: bpSurveyParams
};

export const Loading = Template.bind({});
Loading.args = {
	previewState : "Loading",
	dataParameters: bpSurveyParams
};

export const NoData = Template.bind({});
NoData.args = {
	previewState: "NoData",
	dataParameters: bpSurveyParams
};

export const Live = Template.bind({});
Live.args = {
	previewState: "Live",
	dataParameters: bpSurveyParams
};