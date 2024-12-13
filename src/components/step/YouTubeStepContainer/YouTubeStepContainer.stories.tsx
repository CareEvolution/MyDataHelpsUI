import React from "react";
import YouTubeStepContainer from "./YouTubeStepContainer";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof YouTubeStepContainer> = {
    title: "SurveyStep/YouTubeStepContainer",
    component: YouTubeStepContainer,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof YouTubeStepContainer>;

export const Default: Story = {
    render: () => <YouTubeStepContainer />
};