import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import NumericCalculationStepContainer from "./NumericCalculationStepContainer";

export default {
    title: "SurveyStep/NumericCalculationStepContainer",
    component: NumericCalculationStepContainer,
    parameters: {
        layout: 'fullscreen',
    }
} as Meta<typeof NumericCalculationStepContainer>;

const Template: StoryFn<typeof NumericCalculationStepContainer> = () =>
    <NumericCalculationStepContainer />

export const NumericCalculationStepContainerDefault = Template.bind({});
NumericCalculationStepContainerDefault.args = {}