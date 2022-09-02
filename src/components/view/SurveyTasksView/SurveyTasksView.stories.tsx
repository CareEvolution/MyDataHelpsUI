import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import SurveyTasksView, { SurveyTasksViewProps } from "./SurveyTasksView"

export default {
	title: "View/SurveyTasksView",
	component: SurveyTasksView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof SurveyTasksView>;

const Template: ComponentStory<typeof SurveyTasksView> = (args: SurveyTasksViewProps) => <SurveyTasksView {...args} />;

export const Preview = Template.bind({});
Preview.args = { preview: true };

export const HideIncomplete = Template.bind({});
HideIncomplete.args = { preview: true, hideIncompleteTasks: true };

export const HideComplete = Template.bind({});
HideComplete.args = { preview: true, hideCompleteTasks: true };

export const Live = Template.bind({});
Live.args = { preview: false };