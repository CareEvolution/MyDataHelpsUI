import React from "react";
import Action from "../Action/Action";
import Layout from "../Layout"
import Card, { CardProps } from "./Card"
import "./Card.stories.css";

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

export const FireVariant = {
	args: {
		variant: "fire",
		children: <Action onClick={() => {}} title="Urgent Action Required" subtitle="This task needs immediate attention" />
	},
	render: render
};

export const GlowVariant = {
	args: {
		variant: "glow",
		children: <Action onClick={() => {}} title="New Feature Available" subtitle="Check out our latest feature" />
	},
	render: render
};

export const PulseVariant = {
	args: {
		variant: "pulse",
		children: <Action onClick={() => {}} title="Reminder" subtitle="Don't forget to complete your daily tasks" />
	},
	render: render
};
