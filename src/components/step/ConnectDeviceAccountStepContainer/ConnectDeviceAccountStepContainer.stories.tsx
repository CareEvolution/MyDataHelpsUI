import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ConnectDeviceAccountStepContainer, { ConnectDeviceAccountStepContainerProps } from "./ConnectDeviceAccountStepContainer";

export default {
    title: "SurveyStep/ConnectDeviceAccountStepContainer",
    component: ConnectDeviceAccountStepContainer,
    parameters: {
        layout: "fullscreen",
    },
} as ComponentMeta<typeof ConnectDeviceAccountStepContainer>;

const Template: ComponentStory<typeof ConnectDeviceAccountStepContainer> = (
    args: ConnectDeviceAccountStepContainerProps
) => <ConnectDeviceAccountStepContainer {...args}/>;

export const ConnectDeviceAccountStepContainerGarmin = Template.bind({});
ConnectDeviceAccountStepContainerGarmin.args = {
    deviceType: "Garmin"
};

export const ConnectDeviceAccountStepContainerOmron = Template.bind({});
ConnectDeviceAccountStepContainerOmron.args = {
    deviceType: "Omron"
};

export const ConnectDeviceAccountStepContainerFitbit = Template.bind({});
ConnectDeviceAccountStepContainerFitbit.args = {
    deviceType: "Fitbit"
};
