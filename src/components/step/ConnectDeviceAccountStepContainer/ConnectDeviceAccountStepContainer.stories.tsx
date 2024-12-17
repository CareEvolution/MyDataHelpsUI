import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ConnectDeviceAccountStepContainer from "./ConnectDeviceAccountStepContainer";

const meta: Meta<typeof ConnectDeviceAccountStepContainer> = {
    title: "SurveyStep/ConnectDeviceAccountStepContainer",
    component: ConnectDeviceAccountStepContainer,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof ConnectDeviceAccountStepContainer>;

const render = () => <ConnectDeviceAccountStepContainer />;

export const ConnectDeviceAccountStepContainerDefault : Story = {
    render: render
};
