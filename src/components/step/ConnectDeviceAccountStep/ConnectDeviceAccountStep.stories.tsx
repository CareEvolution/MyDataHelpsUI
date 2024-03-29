﻿import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ConnectDeviceAccountStep, {
    ConnectDeviceAccountStepProps,
} from "./ConnectDeviceAccountStep";

export default {
    title: "SurveyStep/ConnectDeviceAccountStep",
    component: ConnectDeviceAccountStep,
    parameters: {
        layout: "fullscreen",
    },
} as ComponentMeta<typeof ConnectDeviceAccountStep>;

const Template: ComponentStory<typeof ConnectDeviceAccountStep> = (
    args: ConnectDeviceAccountStepProps
) => <ConnectDeviceAccountStep {...args} />;

export const ConnectDeviceAccountStepGarminDefault = Template.bind({});
ConnectDeviceAccountStepGarminDefault.args = {
    title: "Connect Garmin",
    text: "Connect your Garmin account to MyDataHelps to share your activity data.",
    deviceType: "Garmin",
    providerID: 1,
    styles: {},
    onConnect: () => {}
};

export const ConnectDeviceAccountStepGarminCustom = Template.bind({});
ConnectDeviceAccountStepGarminCustom.args = {
    title: "Connect Garmin",
    text: "Connect your Garmin account to MyDataHelps to share your activity data.",
    deviceType: "Garmin",
    providerID: 1,
    styles: {
        "nextButtonBackgroundColor": "#000000",
        "nextButtonBackgroundGradient": {
          "direction": "LeftToRight",
          "endColor": "#0000FF",
          "startColor": "#FFFFFF"
        },
        "nextButtonLetterSpacing": 10,
        "nextButtonTextColor": "#0000FF",
        "nextButtonTextTransform": "Uppercase",
        "nextButtonFontWeight": "900",
        "textAlignment": "Left",
        "textColor": "#0000FF",
        "textFontSize": "18",
        "textFontWeight": "300",
        "titleAlignment": "Left",
        "titleColor": "#0000FF",
        "titleFontSize": "36",
        "titleFontWeight": "900"
    },
    onConnect: () => {}
};

export const ConnectDeviceAccountStepFitbitDefault = Template.bind({});
ConnectDeviceAccountStepFitbitDefault.args = {
    title: "Connect Fitbit",
    text: "Connect your Fitbit account to MyDataHelps to share your activity data.",
    deviceType: "Fitbit",
    providerID: 2,
    styles: {},
    onConnect: () => {}
};

export const ConnectDeviceAccountStepOmronDefault = Template.bind({});
ConnectDeviceAccountStepOmronDefault.args = {
    title: "Connect Omron",
    text: "Connect your Omron account to MyDataHelps to share your activity data.",
    deviceType: "Omron",
    providerID: 3,
    styles: {},
    onConnect: () => {}
};
