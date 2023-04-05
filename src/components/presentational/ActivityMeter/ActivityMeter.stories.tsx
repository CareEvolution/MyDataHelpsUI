import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ActivityMeter, { ActivityMeterProps } from "./ActivityMeter";
import Layout from "../Layout"
import { faShoePrints } from "@fortawesome/free-solid-svg-icons/faShoePrints";
import { faBed } from "@fortawesome/free-solid-svg-icons/faBed";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import '@fortawesome/fontawesome-svg-core/styles.css';
import Card from "../Card";

export default {
	title: "Presentational/ActivityMeter",
	component: ActivityMeter,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof ActivityMeter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ActivityMeter> = (args: ActivityMeterProps) =>
	<Layout colorScheme="auto">
		<Card>
			<div style={{ padding: "16px" }}>
				<ActivityMeter {...args} />
			</div>
		</Card>
	</Layout>;

export const Sleep = Template.bind({});
Sleep.args = {
	fillPercent: .6,
	averageFillPercent: .5,
	color: "#7b88c6",
	icon: <FontAwesomeSvgIcon icon={faBed} />,
	label: "Sleep",
	value: "8h 5m",
	message: "Above average"
}

export const Steps = Template.bind({});
Steps.args = {
	fillPercent: .4,
	averageFillPercent: .5,
	color: "#f5b722",
	icon: <FontAwesomeSvgIcon icon={faShoePrints} rotate={270} />,
	label: "Steps",
	value: "5,251",
	message: "Below average"
}