import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import SurveyTaskList, { SurveyTaskListProps } from "./SurveyTaskList"
import Layout from "../../presentational/Layout"


export default {
	title: "Container/SurveyTaskList",
	component: SurveyTaskList,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof SurveyTaskList>;

const Template: ComponentStory<typeof SurveyTaskList> = (args: SurveyTaskListProps) =>
	<Layout colorScheme="auto">
		<SurveyTaskList {...args} />
	</Layout>;

export const Incomplete = Template.bind({});
Incomplete.args = {
	limit: 3,
	status: 'incomplete',
	title: 'Incomplete Tasks',
	previewState: "IncompleteTasks"
}

export const Complete = Template.bind({});
Complete.args = {
	limit: 3,
	status: 'complete',
	title: 'Completed Tasks',
	previewState: "CompleteTasks"
}