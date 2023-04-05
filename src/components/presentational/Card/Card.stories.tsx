import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Action, { ActionProps } from "../Action/Action";
import Layout from "../Layout"
import Card, { CardProps } from "./Card"
import CardTitle from "../CardTitle/CardTitle";
import "./Card.stories.css";

export default {
	title: "Presentational/Card",
	component: Action,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof Action>;

const Template: ComponentStory<typeof Action> = (args: ActionProps) =>
	<Layout  colorScheme="auto">
		<Card>
			<Action {...args} />
		</Card>
	</Layout>;

export const CardAction = Template.bind({});
CardAction.args = {
	title: "Baseline Survey",
	subtitle: "Tap here to start your baseline survey"
};

const CardTemplate: ComponentStory<typeof Card> = (args: CardProps) =>
	<Layout  colorScheme="auto">
		<Card {...args}>
			<CardTitle title="Card Title" />
			<div style={{ padding: "16px" }}>Card Content</div>
		</Card>
	</Layout>;
export const CardWithClass = CardTemplate.bind({});
CardWithClass.args = {
	className: "card-story-primary"
};