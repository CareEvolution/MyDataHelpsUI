import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ConnectEhrStepContainer from "./ConnectEhrStepContainer";

const meta: Meta<typeof ConnectEhrStepContainer> = {
    title: "SurveyStep/ConnectEhrStepContainer",
    component: ConnectEhrStepContainer,
    parameters: {
        layout: 'fullscreen',
        docs: {
        }
    }
};

export default meta;
type Story = StoryObj<typeof ConnectEhrStepContainer>;

const render = () => <ConnectEhrStepContainer />;

export const ConnectEhrStepContainerDefault: Story = {
    render: render
};