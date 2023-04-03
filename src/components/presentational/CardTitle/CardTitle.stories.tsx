import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Action, { ActionProps } from "../Action/Action";
import Layout from "../Layout"
import Card from "../Card"
import CardTitle, { CardTitleProps } from "./CardTitle"

export default {
	title: "Presentational/CardTitle",
	component: CardTitle,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Action>;

const Template: ComponentStory<typeof CardTitle> = (args: CardTitleProps) =>
	<Layout  colorScheme="light">
		<Card>
			<CardTitle {...args} />
			<div style={{ padding: "16px" }}>Card Content</div>
		</Card>
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	title: "Card Title",
	detailLinkText: "Detail Link",
	onDetailClick: () => { }
}