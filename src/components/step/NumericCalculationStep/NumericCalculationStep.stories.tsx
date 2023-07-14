import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import NumericCalculationStep from "./NumericCalculationStep";

export default {
    title: "SurveyStep/NumericCalculationStep",
    component: NumericCalculationStep,
    parameters: {
        layout: 'fullscreen',
    }
} as Meta<typeof NumericCalculationStep>;

const Template: StoryFn<typeof NumericCalculationStep> = () =>
    <NumericCalculationStep />

export const NumericCalculationStepContainerDefault = Template.bind({});
NumericCalculationStepContainerDefault.args = {}