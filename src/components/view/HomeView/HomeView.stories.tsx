import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import HomeView, { HomeViewProps } from "./HomeView"

export default {
	title: "View/HomeView",
	component: HomeView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof HomeView>;

const Template: ComponentStory<typeof HomeView> = (args: HomeViewProps) => <HomeView {...args} />;

export const Preview = Template.bind({});
Preview.args = { preview: true, notificationsViewUrl: "test.html", ehrConnectApplicationUrl: "test.html" };

export const Live = Template.bind({});
Live.args = { preview: false, notificationsViewUrl:"test.html" };
