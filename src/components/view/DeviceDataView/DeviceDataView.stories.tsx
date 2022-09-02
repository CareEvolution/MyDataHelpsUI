import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DeviceDataView, { DeviceDataViewProps } from "./DeviceDataView"

export default {
	title: "View/DeviceDataView",
	component: DeviceDataView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof DeviceDataView>;

const Template: ComponentStory<typeof DeviceDataView> = (args: DeviceDataViewProps) => <DeviceDataView {...args} />;

export const Preview = Template.bind({});
Preview.args = { preview: true };

export const Live = Template.bind({});
Live.args = { preview: false };