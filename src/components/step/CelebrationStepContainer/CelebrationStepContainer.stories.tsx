import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CelebrationStepContainer from "./CelebrationStepContainer";

export default {
    title: "SurveyStep/CelebrationStepContainer",
    component: CelebrationStepContainer,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof CelebrationStepContainer>;

const Template: ComponentStory<typeof CelebrationStepContainer> = () =>
    <CelebrationStepContainer />

export const CelebrationStepContainerDefault = Template.bind({});
CelebrationStepContainerDefault.args = {}