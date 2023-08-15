import React from "react";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";
import { Meta, StoryFn } from "@storybook/react";
import Layout from "../Layout";
import ProgressBarStepIcon from "./ProgressBarStepIcon/ProgressBarStepIcon";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export default {
	title: "Presentational/ProgressBar",
	component: ProgressBar,
	parameters: {
		layout: 'auto',
	}
} as Meta<typeof ProgressBar>;

const Template: StoryFn<typeof ProgressBar> = (args: ProgressBarProps) => <Layout colorScheme="auto"><ProgressBar {...args} /></Layout>;

export const Default = Template.bind({});

const steps = [...Array(7)].map((_e,i)=> {
	return { stepPercent: Math.trunc(100*(i+1)*25.0/175-(7)), stepIcon: <ProgressBarStepIcon icon={faStar} /> }
});

Default.args = {
	fillPercent: 14,
	steps: steps,
	background: "lightgrey",
	fill: "linear-gradient(180deg, #6cb144, #adc247)"
} as ProgressBarProps;