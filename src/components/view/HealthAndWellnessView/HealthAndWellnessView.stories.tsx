import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import HealthAndWellnessView, { HealthAndWellnessViewProps } from "./HealthAndWellnessView"

export default {
	title: "View/HealthAndWellnessView",
	component: HealthAndWellnessView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof HealthAndWellnessView>;

const Template: ComponentStory<typeof HealthAndWellnessView> = (args: HealthAndWellnessViewProps) => <HealthAndWellnessView {...args} />;

export const Default = Template.bind({});
Default.args = { previewState: "default" };

export const CardBased = Template.bind({});
CardBased.args = { previewState: "default", variant: "cardBased" };

export const Live = Template.bind({});
Live.args = {};