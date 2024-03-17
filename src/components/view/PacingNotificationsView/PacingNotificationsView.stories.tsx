import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import PacingNotificationsView, { PacingNotificationsViewProps } from "./PacingNotificationsView"

export default {
	title: "View/PacingNotificationsView",
	component: PacingNotificationsView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof PacingNotificationsView>;

const Template: ComponentStory<typeof PacingNotificationsView> = (args: PacingNotificationsViewProps) => <PacingNotificationsView {...args} />;

export const Preview = Template.bind({});
Preview.args = { };
