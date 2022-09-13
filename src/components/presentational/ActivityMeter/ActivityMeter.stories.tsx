﻿import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ActivityMeter, { ActivityMeterProps } from "./ActivityMeter";
import Layout from "../Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShoePrints } from "@fortawesome/free-solid-svg-icons";

export default {
	title: "Presentational/ActivityMeter",
	component: ActivityMeter,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof ActivityMeter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ActivityMeter> = (args: ActivityMeterProps) =>
	<Layout bodyBackgroundColor="#FFF">
		<div style={{ padding: "16px" }}>
			<ActivityMeter {...args} />
		</div>
	</Layout>;

export const Sleep = Template.bind({});
Sleep.args = {
	fillPercent: .6,
	averageFillPercent: .5,
	color: "#7b88c6",
	icon: <FontAwesomeIcon icon={faBed} />,
	label: "Sleep",
	value: "8h 5m",
	message: "Above average"
}

export const Steps = Template.bind({});
Steps.args = {
	fillPercent: .4,
	averageFillPercent: .5,
	color: "#f5b722",
	icon: <FontAwesomeIcon icon={faShoePrints} rotate={270} />,
	label: "Steps",
	value: "5,251",
	message: "Below average"
}