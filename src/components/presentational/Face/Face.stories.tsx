import React from "react";
import Layout from "../Layout"
import Face, { FaceProps } from "./Face"
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof Face> = {
	title: "Presentational/Face",
	component: Face,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof Face>;

const render = (args: FaceProps) =>
	<Layout colorScheme="auto">
		<Face  {...args} />
	</Layout>;

export const Default: Story = {
	args: {
		faceValue: 1,
		selected: true
	},
	render: render
};

export const Unselected: Story = {
	args: {
		faceValue: 1,
		selected: false
	},
	render: render
};

export const Clickable: Story = {
	args: {
		faceValue: 1,
		selected: true,
		onClick: () => alert("clicked")
	},
	render: render
};