import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import NotificationList, { NotificationListProps } from "./NotificationList"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/NotificationList",
	component: NotificationList,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args: NotificationListProps) =>
	<Layout autoDarkMode>
		<NotificationList {...args} />
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	previewState: "Default"
};

export const NoData = Template.bind({});
NoData.args = {
	previewState: "NoData"
};