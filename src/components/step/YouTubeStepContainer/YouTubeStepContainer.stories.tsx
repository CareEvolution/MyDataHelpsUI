import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import YouTubeStepContainer from "./YouTubeStepContainer";

export default {
    title: "SurveyStep/YouTubeStepContainer",
    component: YouTubeStepContainer,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof YouTubeStepContainer>;

const Template: ComponentStory<typeof YouTubeStepContainer> = () =>
    <YouTubeStepContainer />

export const YouTubeStepContainerDefault = Template.bind({});
YouTubeStepContainerDefault.args = {}