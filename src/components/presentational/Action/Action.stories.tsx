import React from "react";
import Action, { ActionProps } from "./Action";
import Layout from "../Layout";
import './Action.stories.css';
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Meta, StoryObj } from "@storybook/react";

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

const baseArgs : ActionProps = {
	title: "Baseline Survey",
	subtitle: "Tap here to start your baseline survey",
	onClick: () => alert("Clicked")
};

export const WithClickEvent: Story = {
	args: {...baseArgs},
	render: render
}

export const WithClass: Story = {
	args: {...baseArgs, className: "action-story-primary", renderAs: "div"},
	render: render
}

export const WithIcon: Story = {
	args: {...baseArgs, icon: <FontAwesomeSvgIcon icon={faFile} color="#2e6e9e" />},
	render: render
}

export const WithTitleIcon: Story = {
	args: {...baseArgs, titleIcon: <FontAwesomeSvgIcon icon={faFile} color="#2e6e9e" />},
	render: render
}