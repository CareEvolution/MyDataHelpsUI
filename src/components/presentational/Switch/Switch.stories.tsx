import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Layout from "../Layout"
import Switch, { SwitchProps } from "./Switch"
import TextBlock from "../TextBlock";
import Card from "../Card";

export default {
	title: "Presentational/Switch",
	component: Switch,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args: SwitchProps) =>
	<Layout colorScheme="auto">
		<Card>
			<TextBlock>
				<Switch  {...args} />
			</TextBlock>
		</Card>
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	isOn: false
}


export const CustomBackground = Template.bind({});
CustomBackground.args = {
	isOn: true,
	onBackgroundColor: "green"
}