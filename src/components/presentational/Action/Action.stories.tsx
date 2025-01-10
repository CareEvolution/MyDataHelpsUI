import React from "react";
import Action, { ActionProps } from "./Action";
import Layout from "../Layout"
import './Action.stories.css';
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof Action> = {
	title: "Presentational/Action",
	component: Action,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof Action>;

const render = (args: ActionProps) =>
	<Layout colorScheme="auto">
		<Action {...args} />
	</Layout>;


export const StartSurvey: Story = {
	args: {
		title: "Baseline Survey",
		subtitle: "Tap here to start your baseline survey",
		onClick: () => alert("Clicked")
	},
	render: render
}

export const WithClass: Story = {
	args: {
		title: "Baseline Survey",
		subtitle: "Tap here to start your baseline survey",
		className: "action-story-primary",
		renderAs: "div",
		onClick: () => alert("Clicked")
	},
	render: render
}

export const WithIcon: Story = {
	args: {
		title: "Baseline Survey",
		subtitle: "Tap here to start your baseline survey",
		icon: <FontAwesomeSvgIcon icon={faFile} color="#2e6e9e" />,
		onClick: () => alert("Clicked")
	},
	render: render
}

export const WithTitleIcon: Story = {
	args: {
		titleIcon: <span><FontAwesomeSvgIcon icon={faFile} color="#2e6e9e" />&nbsp;</span>,
		title: "Baseline Survey",
		subtitle: "Tap here to start your baseline survey",
		onClick: () => alert("Clicked")
	},
	render: render
}