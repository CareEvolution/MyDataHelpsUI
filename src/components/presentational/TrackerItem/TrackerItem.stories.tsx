import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TrackerItem, { TrackerItemProps } from "./TrackerItem";
import Layout from "../Layout"

export default {
	title: "Presentational/TrackerItem",
	component: TrackerItem,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof TrackerItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TrackerItem> = (args: TrackerItemProps) =>
	<Layout colorScheme="auto">
		<TrackerItem {...args} />
	</Layout>;

export const Symptom = Template.bind({});
Symptom.args = {
	text: "Migraine",
	selected: true,
	badge: "sev",
	bordered: false,
	color: "#2e6e9e"
}