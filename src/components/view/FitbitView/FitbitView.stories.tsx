import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import FitbitView, { FitbitViewProps } from "./FitbitView"

export default {
	title: "View/FitbitView",
	component: FitbitView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof FitbitView>;

const Template: ComponentStory<typeof FitbitView> = (args: FitbitViewProps) => <FitbitView {...args} />;

export const NotEnabled = Template.bind({});
NotEnabled.args = { connectPreview: "notEnabled", devicesPreview: "notEnabled", chartsPreview: "notEnabled"};

export const NotConnected = Template.bind({});
NotConnected.args = { connectPreview: "notConnected", devicesPreview: "notConnected", chartsPreview: "notConnected"};

export const Connected = Template.bind({});
Connected.args = { connectPreview: "fetchComplete", devicesPreview: "connected", chartsPreview: "connected"};

export const Live = Template.bind({});
Live.args = {};