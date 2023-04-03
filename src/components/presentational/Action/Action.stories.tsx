import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Action, { ActionProps } from "./Action";
import Layout from "../Layout"
import './Action.stories.css';

export default {
	title: "Presentational/Action",
	component: Action,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Action>;

const Template: ComponentStory<typeof Action> = (args: ActionProps) =>
	<Layout  colorScheme="light">
		<Action {...args} />
	</Layout>;

export const StartSurvey = Template.bind({});
StartSurvey.args = {
	title: "Baseline Survey",
	subtitle: "Tap here to start your baseline survey",
	onClick: () => alert("Clicked")
}

export const ActionWithClass = Template.bind({});
ActionWithClass.args = {
	title: "Baseline Survey",
	subtitle: "Tap here to start your baseline survey",
	className: "action-story-primary",
	onClick: () => alert("Clicked")
}