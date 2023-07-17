import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CelebrationStep, { NumericCalculationStepProps } from "./NumericCalculationStep";
import NumericCalculationStep from "./NumericCalculationStep";

export default {
    title: "SurveyStep/NumericCalculationStep",
    component: NumericCalculationStep,
    parameters: {
        layout: 'fullscreen',
    }
} as Meta<typeof NumericCalculationStep>;

const Template: StoryFn<typeof CelebrationStep> = (args: NumericCalculationStepProps) =>
    <NumericCalculationStep {...args} />

export const NumericCalculationStepDefault = Template.bind({});
NumericCalculationStepDefault.args = {
    calculationReady: false,
    calculationResult: "0"
}

export const CelebrationStepCustomStyling = Template.bind({});