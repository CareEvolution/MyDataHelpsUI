import React from "react";
import ActivityMeter, { ActivityMeterProps } from "./ActivityMeter";
import Layout from "../Layout"
import { faShoePrints, faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import '@fortawesome/fontawesome-svg-core/styles.css';
import Card from "../Card";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ActivityMeter> = {
	title: "Presentational/ActivityMeter",
	component: ActivityMeter,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof ActivityMeter>;

const render = (args: ActivityMeterProps) =>
	<Layout colorScheme="auto">
		<Card>
			<div style={{ padding: "16px" }}>
				<ActivityMeter {...args} />
			</div>
		</Card>
	</Layout>;

export const Sleep: Story = {
	args: {
		fillPercent: .6,
		averageFillPercent: .5,
		color: "#7b88c6",
		icon: <FontAwesomeSvgIcon icon={faBed} />,
		label: "Sleep",
		value: "8h 5m",
		message: "Above average"
	},
	render: render
}

export const Steps: Story = {
	args: {
		fillPercent: .4,
		averageFillPercent: .5,
		color: "#f5b722",
		icon: <FontAwesomeSvgIcon icon={faShoePrints} rotate={270} />,
		label: "Steps",
		value: "5,251",
		message: "Below average"
	},
	render: render
}