import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
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
} as ComponentMeta<typeof BloodPressureVisualization>;

const Template: ComponentStory<typeof BloodPressureVisualization> = (args: BloodPressureVisualizationProps) =>
	<Layout colorScheme="auto">
		<Card>
			<BloodPressureVisualization {...args} />
		</Card>
	</Layout>;


const bpSurveyParams : SurveyBloodPressureDataParameters = {
	surveyName: "Blood Pressure Readings",
	dateResultIdentifier : "Date of BP",
	systolicResultIdentifier : "Systolic BP",
	diastolicResultIdentifier : "Diastolic BP"
}

export const WithData = Template.bind({});
WithData.args = {
	previewState : "WithData",
	surveyDataSource: bpSurveyParams
};

export const Loading = Template.bind({});
Loading.args = {
	previewState : "Loading",
	surveyDataSource: bpSurveyParams
};

export const NoData = Template.bind({});
NoData.args = {
	previewState: "NoData",
	surveyDataSource: bpSurveyParams
};

export const Live = Template.bind({});
Live.args = {
	previewState: "Live",
	surveyDataSource: bpSurveyParams
};