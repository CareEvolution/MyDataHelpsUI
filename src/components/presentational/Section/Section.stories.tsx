﻿import React from "react";
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
	<div>Content above section</div>
	<Section {...args}>
		<div>Section </div>
	</Section>
	<div>Content below section</div>
</Layout>;

export const Default: Story = {
	render: render
};

export const NoTopMargin: Story = {
	args: { noTopMargin: true },
	render: render
};

export const BackgroundColor: Story = {
	args: { backgroundColor: "var(--mdhui-color-primary)" },
	render: render
};
