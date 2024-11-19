import React from "react";
import CelebrationStepContainer from "./CelebrationStepContainer";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CelebrationStepContainer> = {
    title: "SurveyStep/CelebrationStepContainer",
    component: CelebrationStepContainer,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof CelebrationStepContainer>;

const render = () => <CelebrationStepContainer />;

export const Default: Story = {
    args: {},
    render: render
};
