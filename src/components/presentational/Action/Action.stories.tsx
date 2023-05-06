import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Action, { ActionProps } from "./Action";
import Layout from "../Layout"
import './Action.stories.css';
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export default {
	title: "Presentational/Action",
	component: Action,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Action>;

const Template: ComponentStory<typeof Action> = (args: ActionProps) =>
	<Layout colorScheme="auto">
		<Action {...args} />
	</Layout>;

export const StartSurvey = Template.bind({});
StartSurvey.args = {
	title: "Baseline Survey",
	subtitle: "Tap here to start your baseline survey",
	onClick: () => alert("Clicked")
}

export const WithClass = Template.bind({});
WithClass.args = {
	title: "Baseline Survey",
	subtitle: "Tap here to start your baseline survey",
	className: "action-story-primary",
	onClick: () => alert("Clicked")
}


export const WithIcon = Template.bind({});
WithIcon.args = {
	title: "Baseline Survey",
	subtitle: "Tap here to start your baseline survey",
	icon: <FontAwesomeSvgIcon icon={faFile} color="#2e6e9e" />,
	onClick: () => alert("Clicked")
}