import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import NotificationsView, { NotificationsViewProps } from "./NotificationsView"

export default {
	title: "View/NotificationsView",
	component: NotificationsView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof NotificationsView>;

const Template: ComponentStory<typeof NotificationsView> = (args: NotificationsViewProps) => <NotificationsView {...args} />;

export const Preview = Template.bind({});
Preview.args = { preview: true };

export const Live = Template.bind({});
Live.args = { preview: false };