import React from "react"
import BloodPressureVisualization, { BloodPressureVisualizationProps } from "./BloodPressureVisualization"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { SurveyBloodPressureDataParameters } from "../../../helpers/blood-pressure-data-providers/survey-blood-pressure-data-provider"
import { DateRangeCoordinator } from "../../presentational"
import { Description } from "@storybook/blocks"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof BloodPressureVisualization> = {
	title: "Container/BloodPressureVisualization",
	component: BloodPressureVisualization,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	},
};


export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default : Story = {
	args: {
		previewState: "Default",
		surveyDataSource: bpSurveyParams
	},
	render: render
};

export const Loading  : Story = {
	args: {
		previewState: "Loading",
		surveyDataSource: bpSurveyParams
	},
	render: render
};

export const NoData  : Story = {
	args: {
		previewState: "NoData",
		surveyDataSource: bpSurveyParams
	},
	render: render
};

export const Live  : Story = {
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