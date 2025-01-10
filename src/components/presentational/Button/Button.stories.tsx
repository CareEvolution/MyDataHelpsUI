import React from "react";
import Button, { ButtonProps } from "./Button";
import Layout from "../Layout"
import TextBlock from "../TextBlock";
import Section from "../Section";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof Button> = {
	title: "Presentational/Button",
	component: Button,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof Button>;

const render = (args: ButtonProps) =>
	<Layout colorScheme="auto">
		<Section>
			<TextBlock>
				<Button {...args} />
			</TextBlock>
		</Section>
	</Layout>;

export const Enabled: Story = {
	args: {
		children: "Click Me",
		disabled: false
	},
	render: render
}

export const Disabled: Story = {
	args: {
		children: "Click Me",
		disabled: true
	},
	render: render
}

export const CustomColor: Story = {
	args: {
		disabled: false,
		children: "Click Me",
		color: "red"
	},
	render: render
}

export const Loading: Story = {
	args: {
		disabled: false,
		children: "Doing Something...",
		loading: true
	},
	render: render
}

export const SubtleVariant: Story = {
	args: {
		disabled: false,
		children: "Click Here",
		variant: "subtle"
	},
	render: render
}

export const LightVariant: Story = {
	args: {
		disabled: false,
		children: "Click Here",
		variant: "light"
	},
	render: render
}

export const NotFullWidth: Story = {
	args: {
		disabled: false,
		children: "Click Here",
		fullWidth: false
	},
	render: render
}

export const DefaultMargin: Story = {
	args: {
		disabled: false,
		children: "Click Here",
		defaultMargin: true
	},
	render: render
}