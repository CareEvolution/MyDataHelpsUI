import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";
import Layout from "../Layout"
import TextBlock from "../TextBlock";
import Section from "../Section";

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
	<Layout colorScheme="auto">
		<Section>
			<TextBlock>
				<Button {...args} />
			</TextBlock>
		</Section>
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

export const CustomColor = Template.bind({});
CustomColor.args = {
	disabled: false,
	children: "Click Me",
	color: "red"
}

export const Loading = Template.bind({});
Loading.args = {
	disabled: false,
	children: "Doing Something...",
	loading: true
}

export const SubtleVariant = Template.bind({});
SubtleVariant.args = {
	disabled: false,
	children: "Click Here",
	variant: "subtle"
}

export const LightVariant = Template.bind({});
LightVariant.args = {
	disabled: false,
	children: "Click Here",
	variant: "light"
}