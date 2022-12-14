import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";
import Layout from "../Layout"

export default {
	title: "Presentational/Button",
	component: Button,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args: ButtonProps) =>
	<Layout>
		<Button {...args}>
		</Button>
	</Layout>;

export const Enabled = Template.bind({});
Enabled.args = {
	children: "Click Me",
	disabled: false
}

export const Disabled = Template.bind({});
Disabled.args = {
	children: "Click Me",
	disabled: true
}