import React from "react";
import TrackerItem, { TrackerItemProps } from "./TrackerItem";
import Layout from "../Layout"
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof TrackerItem> = {
	title: "Presentational/TrackerItem",
	component: TrackerItem,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof TrackerItem>;

const render = (args: TrackerItemProps) => <Layout colorScheme="auto">
	<TrackerItem {...args} />
</Layout>;

export const Symptom: Story = {
	args: {
		text: "Migraine",
		selected: true,
		badge: "sev",
		bordered: false,
		color: "#2e6e9e"
	},
	render: render
};