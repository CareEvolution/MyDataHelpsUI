import React from "react";
import Layout from "../Layout"
import Card from "../Card"
import CardTitle, { CardTitleProps } from "./CardTitle"
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof CardTitle> = {
	title: "Presentational/CardTitle",
	component: CardTitle,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof CardTitle>;

const render = (args: CardTitleProps) => <Layout colorScheme="auto">
	<Card>
		<CardTitle {...args} />
		<div style={{ padding: "16px" }}>Card Content</div>
	</Card>
</Layout>;

export const Default: Story = {
	args: {
		title: "Card Title",
		detailLinkText: "Detail Link",
		onDetailClick: () => { }
	},
	render: render
}