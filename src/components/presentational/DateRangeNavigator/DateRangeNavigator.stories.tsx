﻿import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Layout from "../Layout"
import DateRangeNavigator, { DateRangeNavigatorProps } from "./DateRangeNavigator";

export default {
	title: "Presentational/DateRangeNavigator",
	component: DateRangeNavigator,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof DateRangeNavigator>;

const Template: ComponentStory<typeof DateRangeNavigator> = (args: DateRangeNavigatorProps) =>
	<Layout colorScheme="auto">
		<DateRangeNavigator {...args} />
	</Layout>;

var currentDate = new Date();
export const Day = Template.bind({});
Day.args = {
	intervalStart: new Date(),
	intervalType: "Day"
}


export const Month = Template.bind({});
Month.args = {
	intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0),
	intervalType: "Month"
}

export const SixMonth = Template.bind({});
SixMonth.args = {
	intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0),
	intervalType: "6Month"
}


export const Week = Template.bind({});
Week.args = {
	intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0),
	intervalType: "Week"
}

export const Rounded = Template.bind({});
Rounded.args = {
	intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0),
	intervalType: "Week",
	variant: "rounded"
}