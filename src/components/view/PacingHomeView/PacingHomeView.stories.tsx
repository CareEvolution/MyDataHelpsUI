import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import PacingHomeView, { PacingHomeViewProps } from "./PacingHomeView"

export default {
	title: "View/PacingHomeView",
	component: PacingHomeView,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof PacingHomeView>;

const Template: ComponentStory<typeof PacingHomeView> = (args: PacingHomeViewProps) => <PacingHomeView {...args} />;

export const Preview = Template.bind({});
Preview.args = { };
