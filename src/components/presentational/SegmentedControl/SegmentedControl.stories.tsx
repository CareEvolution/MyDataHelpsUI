import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Layout from "../Layout"
import SegmentedControl, { SegmentedControlProps } from "./SegmentedControl"

export default {
	title: "Presentational/SegmentedControl",
	component: SegmentedControl,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof SegmentedControl>;

const Template: ComponentStory<typeof SegmentedControl> = (args: SegmentedControlProps) =>
	<Layout autoDarkMode>
		<SegmentedControl  {...args} />
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	segments: [
		{
			key: "Week",
			title: "Week"
		},
		{
			key: "Month",
			title: "Month"
		},
		{
			key: "Year",
			title: "Year"
		}
	],
	selectedSegment: "Month",
	color: "--var(--mdhui-color-primary)"
}