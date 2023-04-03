import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import SingleSurveyTask, { SingleSurveyTaskProps } from "./SingleSurveyTask"
import Layout from "../Layout"

export default {
	title: "Presentational/SingleSurveyTask",
	component: SingleSurveyTask,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof SingleSurveyTask>;

const Template: ComponentStory<typeof SingleSurveyTask> = (args: SingleSurveyTaskProps) =>
	<Layout  colorScheme="auto">
		<SingleSurveyTask {...args} />
	</Layout>;

export const Incomplete = Template.bind({});
Incomplete.args = {
	task: {
		id: "test",
		status: "incomplete",
		surveyDisplayName: "Pain Survey",
		surveyDescription: "5 minutes",
		surveyName: "PainSurvey",
		dueDate: (new Date()).toISOString(),
		hasSavedProgress: false,
		insertedDate: "2022-03-06T20:00:00Z",
		modifiedDate: "2022-03-06T20:00:00Z",
		surveyID: "1",
		linkIdentifier:"1"
	}
}

export const Complete = Template.bind({});
Complete.args = {
	task: {
		id: "test",
		status: "complete",
		surveyDisplayName: "Pain Survey",
		surveyDescription: "5 minutes",
		surveyName: "PainSurvey",
		endDate: "2022-03-06T20:00:00Z",
		dueDate: (new Date()).toISOString(),
		hasSavedProgress: false,
		insertedDate: "2022-03-06T20:00:00Z",
		modifiedDate: "2022-03-06T20:00:00Z",
		surveyID: "1",
		linkIdentifier: "1"
	}
}

export const InProgress = Template.bind({});
InProgress.args = {
	task: {
		id: "test",
		status: "incomplete",
		surveyDisplayName: "Pain Survey",
		surveyDescription: "5 minutes",
		surveyName: "PainSurvey",
		dueDate: (new Date()).toISOString(),
		hasSavedProgress: true,
		insertedDate: "2022-03-06T20:00:00Z",
		modifiedDate: "2022-03-06T20:00:00Z",
		surveyID: "1",
		linkIdentifier: "1"
	}
}

export const LongDescription = Template.bind({});
LongDescription.args = {
	task: {
		id: "test",
		status: "incomplete",
		surveyDisplayName: "Long Description",
		surveyDescription: "Here is a really long description that will likely need to wrap.  It should wrap before overlapping the right chevron.",
		surveyName: "PainSurvey",
		dueDate: (new Date()).toISOString(),
		hasSavedProgress: false,
		insertedDate: "2022-03-06T20:00:00Z",
		modifiedDate: "2022-03-06T20:00:00Z",
		surveyID: "1",
		linkIdentifier:"1"
	}
}

