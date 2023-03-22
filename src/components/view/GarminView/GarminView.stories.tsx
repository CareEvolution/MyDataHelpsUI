import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import GarminView, { GarminViewProps } from "./GarminView"

export default {
	title: "View/GarminView",
	component: GarminView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof GarminView>;

const Template: ComponentStory<typeof GarminView> = (args: GarminViewProps) => <GarminView {...args} />;

export const NotEnabled = Template.bind({});
NotEnabled.args = { connectPreview: "notEnabled", devicesPreview: "notEnabled", chartsPreview: "notEnabled"};

export const NotConnected = Template.bind({});
NotConnected.args = { connectPreview: "notConnected", devicesPreview: "notConnected", chartsPreview: "notConnected"};

export const Connected = Template.bind({});
Connected.args = { connectPreview: "fetchComplete", devicesPreview: "connected", chartsPreview: "connected"};

export const Live = Template.bind({});
Live.args = {};