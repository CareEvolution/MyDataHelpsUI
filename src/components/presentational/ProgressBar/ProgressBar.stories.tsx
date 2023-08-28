import React from "react";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";
import { Meta, StoryFn } from "@storybook/react";
import Layout from "../Layout";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default {
	title: "Presentational/ProgressBar",
	component: ProgressBar,
	parameters: {
		layout: 'auto',
	},
	argTypes: {
		background: { control: 'color', description: "The background color of the progress bar" },
		fill: { control: 'color', description: "The fill color of the progress bar" },
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
	fill: "linear-gradient(90deg, #6cb144, #adc247)",
	steps: [{
		stepPercent: 99,
		stepIcon:
			<span style={{ borderRadius: "24px", height: "24px", width: "24px", marginTop: "-2px", color: "rgba(148, 148, 148, 1)", backgroundColor: "rgba(148, 148, 148, 1)", padding: "4px 4px" }}>
				<FontAwesomeIcon icon={faStar} size={"1x"} style={{ color: "#fcfcfc", marginTop: "-3px" }} />
			</span>
	}],
} as ProgressBarProps;

export const GradientFill100TargetStep = Template.bind({});
GradientFill100TargetStep.args = {
	fillPercent: 100,
	fill: "linear-gradient(90deg, #6cb144, #adc247)",
	steps: [{
		stepPercent: 99,
		stepIcon:
			<span style={{ border: "2px solid gold", borderRadius: "24px", height: "24px", width: "24px", marginTop: "-3px", color: "rgba(148, 148, 148, 1)", backgroundColor: "#EA6B54", padding: "4px 4px" }}>
				<FontAwesomeIcon icon={faSolidStar} size={"1x"} style={{ color: "gold", marginTop: "-3px" }} />
			</span>
	}],
} as ProgressBarProps;

export const GradientFillIconSteps = Template.bind({});
GradientFillIconSteps.args = {
	fillPercent: 50,
	fill: "linear-gradient(270deg, #F0CA68 0%, #E5917F 100%)",
	steps: [...Array(4)].map((_e, i) => {
		let value = (i + 1) * 25;
		let icon = (value <= 50) ?
			<span style={{ border: "2px solid gold", borderRadius: "16px", height: "16px", width: "16px", color: "rgba(148, 148, 148, 1)", backgroundColor: "#EA6B54", padding: "4px 4px" }}>
				<FontAwesomeIcon icon={faSolidStar} size={"1x"} style={{ color: "white", marginTop: "-3px" }} />
			</span> :
			<span style={{ border: "2px solid rgba(148, 148, 148, 1)", borderRadius: "16px", height: "16px", width: "16px", color: "rgba(148, 148, 148, 1)", backgroundColor: "rgba(148, 148, 148, 1)", padding: "4px 4px" }}>
				<FontAwesomeIcon icon={faSolidStar} size={"1x"} style={{ color: "white", marginTop: "-3px" }} />
			</span>;
		return {
			stepPercent: Math.trunc(value) - 2,
			stepIcon: icon
		}
	})
} as ProgressBarProps;

export const LabelSteps = Template.bind({});
LabelSteps.args = {
	fillPercent: 100 * 75 / 175,
	fill: "rgb(34, 115, 209, 0.5)",
	steps: [...Array(7)].map((_e, i) => {
		let amount = (i + 1) * 25;
		let icon = (amount == 75) ?
			<span style={{ border: "2px solid white", borderRadius: "14px", height: "14px", width: "14px", color: "white", backgroundColor: "rgb(34, 115, 209)", padding: "4px 4px", fontSize: "0.8em", marginTop: "1px" }}>
				75
			</span> :
			((amount < 75) ?
				<span style={{ border: "2px solid white", borderRadius: "14px", height: "14px", width: "14px", color: "rgba(148, 148, 148, 1)", backgroundColor: "rgb(34, 115, 209)", padding: "4px 4px", marginTop: "1px" }}>
					<FontAwesomeIcon icon={faSolidStar} size={"1x"} style={{ color: "white", marginTop: "-3px" }} />
				</span> :
				<span style={{ border: "2px solid rgba(148, 148, 148, 1)", borderRadius: "14px", height: "14px", width: "14px", color: "rgba(148, 148, 148, 1)", backgroundColor: "rgba(148, 148, 148, 1)", padding: "4px 4px", marginTop: "1px" }}>
					<FontAwesomeIcon icon={faStar} size={"1x"} style={{ color: "rgb(34, 115, 209)", marginTop: "-3px" }} />
				</span>
			);
		return {
			stepPercent: Math.trunc(100 * amount / 175) - 2,
			stepIcon: icon
		}
	})
} as ProgressBarProps



