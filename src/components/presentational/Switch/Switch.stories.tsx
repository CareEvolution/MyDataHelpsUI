import React from "react";
import Layout from "../Layout";
import Switch, { SwitchProps } from "./Switch";
import TextBlock from "../TextBlock";
import Card from "../Card";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof Switch> = {
	title: "Presentational/Switch",
	component: Switch,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof Switch>;

const render = (args: SwitchProps) => <Layout colorScheme="auto">
	<Card>
		<TextBlock>
			<Switch  {...args} />
		</TextBlock>
	</Card>
</Layout>;

export const Default: Story = {
	args: {
		isOn: false
	},
	render: render
};

export const CustomBackground: Story = {
	args: {
		isOn: true,
		onBackgroundColor: "green"
	},
	render: render
};