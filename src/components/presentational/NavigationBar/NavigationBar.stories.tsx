import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NavigationBar, { NavigationBarProps } from "./NavigationBar";
import Layout from "../Layout"
import DateRangeNavigator from "../DateRangeNavigator";

export default {
	title: "Presentational/NavigationBar",
	component: NavigationBar,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof NavigationBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavigationBar> = (args: NavigationBarProps) =>
	<Layout  colorScheme="auto">
		<NavigationBar {...args} />
	</Layout>;

export const Drilldown = Template.bind({});
Drilldown.args = {
	title: "My Title",
	showBackButton: true
}

export const Modal = Template.bind({});
Modal.args = {
	title: "My Title",
	showCloseButton: true
}

export const CustomButtons = Template.bind({});
CustomButtons.args = {
	title: "My Title",
	showBackButton: true,
	showCloseButton: true,
	backButtonText: "Home",
	closeButtonText: "Done"
}


export const Compressed = Template.bind({});
Compressed.args = {
	title: "My Title",
	showCloseButton: true,
	showBackButton: true,
	variant: "compressed"
}


export const WithDateRangeNavigator = Template.bind({});
WithDateRangeNavigator.args = {
	title: "Migraine",
	showCloseButton: true,
	children:
		<div style={{ overflow: "hidden", borderRadius: "16px", marginTop: "16px" }}>
			<DateRangeNavigator intervalType="Week" intervalStart={new Date()} onIntervalChange={() => { }}></DateRangeNavigator>
		</div>
}


export const WithRoundedDateRangeNavigator = Template.bind({});
WithRoundedDateRangeNavigator.args = {
	title: "Migraine",
	showCloseButton: true,
	children:
		<div style={{ overflow: "hidden", borderRadius: "16px", marginTop: "16px" }}>
			<DateRangeNavigator intervalType="Week" intervalStart={new Date()} onIntervalChange={() => { }} variant="rounded"></DateRangeNavigator>
		</div>
}