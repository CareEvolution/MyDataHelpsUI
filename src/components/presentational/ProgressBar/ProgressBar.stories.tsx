import React from "react";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";
import { Meta, StoryFn } from "@storybook/react";
import Layout from "../Layout";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBarStep from "./ProgressBarStep";

export default {
	title: "Presentational/ProgressBar",
	component: ProgressBar,
	parameters: {
		layout: 'auto',
	},
	argTypes: {
		backgroundColor: { control: 'object', description: "The backgroundColor color of the progress bar specified as a ColorDefinition" },
		fillColor: { control: 'object', description: "The fillColor color of the progress bar specified as a ColorDefinition" },
		fillPercent: { control: 'number', description: "The percent of the progress bar that is filled" },
		steps: { control: 'object', description: "An array of steps to display on the progress bar. A step specifies the position on the progress bar as a percent and a React element to display at that position." },
	}
} as Meta<typeof ProgressBar>;

const Template: StoryFn<typeof ProgressBar> = (args: ProgressBarProps) => <Layout colorScheme="auto"><ProgressBar {...args} /></Layout>;

export const Default = Template.bind({});
Default.args = {
	fillPercent: 35
}

export const GradientFill75TargetStep = Template.bind({});
GradientFill75TargetStep.args = {
	fillPercent: 75,
	backgroundColor: { lightMode: "#d3d3d3", darkMode: "#c2c2c2" },
	fillColor: "linear-gradient(90deg, #6cb144, #adc247)",
	steps: [{
		percent: 100,
		icon:
			<ProgressBarStep borderColor="rgba(148, 148, 148, 1)" backgroundColor="rgba(148, 148, 148, 1)" height="24px">
				<FontAwesomeIcon icon={faStar} size={"1x"} style={{ color: "#fcfcfc", marginTop: "-3px" }} />
			</ProgressBarStep>
	}],
} as ProgressBarProps;

export const GradientFill100TargetStep = Template.bind({});
GradientFill100TargetStep.args = {
	fillPercent: 100,
	fillColor: "linear-gradient(90deg, #6cb144, #adc247)",
	steps: [{
		percent: 100,
		icon:
			<ProgressBarStep borderColor="gold" backgroundColor="#EA6B54" height="24px">
				<FontAwesomeIcon icon={faStar} size={"1x"} style={{ color: "gold", marginTop: "-3px" }} />
			</ProgressBarStep>
	}],
} as ProgressBarProps;

export const GradientFillIconSteps = Template.bind({});
GradientFillIconSteps.args = {
	fillPercent: 50,
	backgroundColor: "#d3d3d3",
	fillColor: "linear-gradient(270deg, #F0CA68 0%, #E5917F 100%)",
	steps: [...Array(4)].map((_e, i) => {
		let value = (i + 1) * 25;
		let icon = (value <= 50) ?
			<ProgressBarStep borderColor="gold" backgroundColor="#EA6B54" height="16px">
				<FontAwesomeIcon icon={faSolidStar} size={"1x"} style={{ color: "white", marginTop: "-3px" }} />
			</ProgressBarStep> :
			<ProgressBarStep borderColor="rgba(148, 148, 148, 1)" backgroundColor="rgba(148, 148, 148, 1)" height="16px">
				<FontAwesomeIcon icon={faSolidStar} size={"1x"} style={{ color: "white", marginTop: "-3px" }} />
			</ProgressBarStep>
		return {
			percent: Math.trunc(value),
			icon: icon
		}
	})
} as ProgressBarProps;

export const LabelSteps = Template.bind({});
LabelSteps.args = {
	fillPercent: 100 * 75 / 175,
	fillColor: "rgb(34, 115, 209, 0.5)",
	steps: [...Array(7)].map((_e, i) => {
		let amount = (i + 1) * 25;
		let icon = (amount == 75) ?
			<ProgressBarStep borderColor="white" backgroundColor="rgb(34, 115, 209)" height="14px">
				<span style={{ fontSize: "0.8em" }}>75</span>
			</ProgressBarStep> :
			((amount < 75) ?
				<ProgressBarStep borderColor="white" backgroundColor="rgb(34, 115, 209)" height="14px">
					<FontAwesomeIcon icon={faSolidStar} size={"1x"} style={{ color: "white", marginTop: "-3px" }} />
				</ProgressBarStep> :
				<ProgressBarStep borderColor="white" backgroundColor="rgba(148, 148, 148, 1)" height="14px">
					<FontAwesomeIcon icon={faStar} size={"1x"} style={{ color: "rgb(34, 115, 209)", marginTop: "-3px" }} />
				</ProgressBarStep>
			);
		return {
			percent: Math.trunc(100 * amount / 175),
			icon: icon
		}
	})
} as ProgressBarProps



