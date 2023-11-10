import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import BloodPressureVisualization, { BloodPressureVisualizationProps } from "./BloodPressureVisualization"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

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

export const Default = Template.bind({});
Default.args = {
    source : "Survey",
    surveyName:  "My Blood Pressure Survey",
    stepIdentifier : "Step1",
    dateOfResultId : "logDate",
    systolicResultId :"systolic",
    diastolicResultId : "diastolic"
};