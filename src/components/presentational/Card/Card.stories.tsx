import React from "react";
import Action from "../Action/Action";
import Layout from "../Layout"
import Card, { CardProps } from "./Card"
import "./Card.stories.css";
import { Goal } from '../../container';

export default {
	title: "Presentational/Card",
	component: Card,
	parameters: {
		layout: 'fullscreen',
	}
};

let render = (args: CardProps) => <Layout><Card {...args} /></Layout>

export const CardAction = {
	args: {
		children: <Action onClick={() => {}} title="Baseline Survey" subtitle="Tap here to start your baseline survey" />
	},
	render: render
};

export const CardWithClass = {
	args: {
		className: "card-story-primary",
		children: <Action onClick={() => {}} title="Baseline Survey" subtitle="Tap here to start your baseline survey" />
	},
	render: render
};

export const SubtleVariant = {
	args: {
		variant: "subtle",
		children: <Action onClick={() => {}} title="Baseline Survey" subtitle="Tap here to start your baseline survey" />
	},
	render: render
};

export const HighlightVariant = {
	args: {
		variant: "highlight",
		children: <Action onClick={() => {}} title="Baseline Survey" subtitle="Tap here to start your baseline survey" />
	},
	render: render
};

export const ClickableCard = {
	args: {
		children: <>
			<Action title="See more details" bottomBorder />
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<Goal variant="compact" label="Goal 1" targetValue={5} maxValue={10} valueProvider={{ type: 'static integer', getValue: async () => 7 }} />
				<Goal variant="compact" label="Goal 2" targetValue={5} maxValue={10} valueProvider={{ type: 'static integer', getValue: async () => 3 }} />
			</div>
		</>,
		onClick: () => console.log("Card Clicked!")
	},
	render: render
};