import React from "react";
import Layout from "../Layout"
import SegmentedControl, { SegmentedControlProps } from "./SegmentedControl"
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof SegmentedControl> = {
	title: "Presentational/SegmentedControl",
	component: SegmentedControl,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const render = (args: SegmentedControlProps) =>
(<Layout colorScheme="auto">
	<SegmentedControl  {...args} />
</Layout>)

const defaultArgs: SegmentedControlProps = {
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
	color: "--var(--mdhui-color-primary)",
	onSegmentSelected: (segmentKey) => console.log(segmentKey)
};

export const Default: Story = {
	args: defaultArgs,
	render: render
};

export const OptionsHorizontal: Story = {
	args: { ...defaultArgs, variant: "optionsHorizontal" },
	render: render
};

export const OptionsVertical: Story = {
	args: { ...defaultArgs, variant: "optionsVertical" },
	render: render
};