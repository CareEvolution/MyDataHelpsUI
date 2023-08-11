import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ConnectDeviceAccountStepContainer from "./ConnectDeviceAccountStepContainer";

export default {
    title: "SurveyStep/ConnectDeviceAccountStepContainer",
    component: ConnectDeviceAccountStepContainer,
    parameters: {
        layout: "fullscreen",
    },
} as ComponentMeta<typeof ConnectDeviceAccountStepContainer>;

const Template: ComponentStory<
    typeof ConnectDeviceAccountStepContainer
> = () => <ConnectDeviceAccountStepContainer />;

export const ConnectDeviceAccountStepContainerDefault = Template.bind({});
ConnectDeviceAccountStepContainerDefault.args = {};
