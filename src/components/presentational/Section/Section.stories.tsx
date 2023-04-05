﻿import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Action, { ActionProps } from "../Action/Action";
import Layout from "../Layout"
import Section from "./Section"

export default {
	title: "Presentational/Section",
	component: Action,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Action>;

const Template: ComponentStory<typeof Action> = (args: ActionProps) =>
	<Layout colorScheme="auto">
		<Section>
			<Action {...args} />
		</Section>
	</Layout>;

export const SectionAction = Template.bind({});
SectionAction.args = {
	title: "Baseline Survey",
	subtitle: "Tap here to start your baseline survey"
}