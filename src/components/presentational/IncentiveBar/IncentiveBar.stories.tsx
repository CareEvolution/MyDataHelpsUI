import React from "react";
import IncentiveBar, { IncentiveBarProps } from "./IncentiveBar";
import { ComponentMeta, ComponentStory, Meta, StoryFn } from "@storybook/react";
import Layout from "../Layout";

export default {
	title: "Presentational/IncentiveBar",
	component: IncentiveBar,
	parameters: {
		layout: 'auto',
	}
} as Meta<typeof IncentiveBar>;

const Template: StoryFn<typeof IncentiveBar> = (args: IncentiveBarProps) => <Layout colorScheme="auto"><IncentiveBar {...args} /></Layout>;

export const Default = Template.bind({});
Default.args = {
	primaryColorString: "#00A862",
	secondaryColorString: "#BFE9D8",
	increments: 10,
	totalAvailable: 100,
	earned: 30,
	showDetail: true,

} as IncentiveBarProps;