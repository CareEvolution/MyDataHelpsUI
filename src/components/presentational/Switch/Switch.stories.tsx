import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Layout from "../Layout"
import Switch, { SwitchProps } from "./Switch"

export default {
	title: "Presentational/Switch",
	component: Switch,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args: SwitchProps) =>
	<Layout autoDarkMode>
		<Switch  {...args} />
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	isOn: false,
	onBackgroundColor: "blue"
}