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
	<Section noTopMargin={true}>
		<div>Section with NO TOP MARGIN</div>
	</Section>
	<Section backgroundColor={"yellow"}>
		<div>Section with YELLOW background color</div>
	</Section>
	<Section {...args}>
		<div>Default Section. Has a top margin by default</div>
	</Section>
</Layout>;

export const Default: Story = {
	render: render
};
