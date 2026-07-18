import React from "react";
import Icon, { IconProps } from "./Icon";
import Layout from "../Layout"
import { faUserGear } from '@fortawesome/free-solid-svg-icons'
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
	title: "Presentational/Icon",
	component: Icon,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;

const render = (args: IconProps) =>
	<Layout colorScheme="auto">
		<Icon {...args} />
	</Layout>;

export const SolidIcon: Story = {
	args: {
		disabled: false,
		icon: { iconName: "gear" }
	},
	render: render
}

export const RegularIcon: Story = {
	args: {
		disabled: false,
		icon: { iconName: "calendar",prefix: "far" }
	},
	render: render
}

export const EmptyIcon: Story = {
	args: {
		disabled: false,
		icon: { iconName: "" }
	},
	render: render
}

export const FontawesomeIconDirect: Story = {
	args: {
		disabled: false,
		icon: faUserGear
	},
	render: render
}

export const ClickMe: Story = {
	args: {
		disabled: false,
		icon: { iconName: "arrow-pointer" },
		onClick: (() => console.log("Clicked"))
	},
	render: render
}

export const ClickDisabled: Story = {
	args: {
		disabled: true,
		icon: { iconName: "arrow-pointer" },
		onClick: (() => console.log("Click disabled - you should not see this message."))
	},
	render: render
}
