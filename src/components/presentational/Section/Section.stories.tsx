﻿import React from "react";
import Action from "../Action/Action";
import Layout from "../Layout";
import Section, { SectionProps } from "./Section";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Section> = {
	title: "Presentational/Section",
	component: Section,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof Section>;

const render = (args: SectionProps) => <Layout colorScheme="auto">
	<Section {...args}>
		<Action title="Baseline Survey" subtitle="Tap here to start your baseline survey" />
	</Section>
</Layout>;

export const Default: Story = {
	render: render
};

export const NoTopMargin: Story = {
	args: {
		noTopMargin: true
	},
	render: render
}

export const WithBackgroundColor: Story = {
	args: {
		backgroundColor: "yellow"
	},
	render: render
}
