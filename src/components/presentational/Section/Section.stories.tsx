﻿import React from "react";
import Action, { ActionProps } from "../Action/Action";
import Layout from "../Layout"
import Section from "./Section"
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof Section> = {
	title: "Presentational/Section",
	component: Action,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof Action>;

const render = (args: ActionProps) => <Layout colorScheme="auto">
	<Section >
		<Action {...args} />
	</Section>
</Layout>;

export const SectionAction: Story = {
	args: { 
		title: "Baseline Survey",
		subtitle: "Tap here to start your baseline survey"
	},
	render: render
};
