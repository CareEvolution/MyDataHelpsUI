import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Layout from "../Layout"
import Face, { FaceProps } from "./Face"

export default {
	title: "Presentational/Face",
	component: Face,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Face>;

const Template: ComponentStory<typeof Face> = (args: FaceProps) =>
	<Layout autoDarkMode>
		<Face  {...args} />
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	faceValue: 1,
	selected: true
}

export const Unselected = Template.bind({});
Unselected.args = {
	faceValue: 1,
	selected: false
}

export const Clickable = Template.bind({});
Clickable.args = {
	faceValue: 1,
	selected: true,
	onClick: () => alert("clicked")
}