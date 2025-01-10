import React from "react";
import Layout from "../Layout"
import DateRangeNavigator, { DateRangeNavigatorProps } from "./DateRangeNavigator";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof DateRangeNavigator> = {
	title: "Presentational/DateRangeNavigator",
	component: DateRangeNavigator,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof DateRangeNavigator>;

const render = (args: DateRangeNavigatorProps) => <Layout colorScheme="auto">
	<DateRangeNavigator {...args} />
</Layout>;

var currentDate = new Date();

export const Day: Story = {
	args: {
		intervalStart: new Date(),
		intervalType: "Day"
	},
	render: render
}

export const Week: Story = {
	args: {
		intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0),
		intervalType: "Week"
	},
	render: render
}

export const Month: Story = {
	args: {
		intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0),
		intervalType: "Month"
	},
	render: render
}

export const SixMonth: Story = {
	args: {
		intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0),
		intervalType: "6Month"
	},
	render: render
}

export const Rounded: Story = {
	args: {
		intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0),
		intervalType: "Week",
		variant: "rounded"
	},
	render: render
}