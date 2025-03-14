import React from "react";
import ConnectDeviceAccountStep, {
    ConnectDeviceAccountStepProps,
} from "./ConnectDeviceAccountStep";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ConnectDeviceAccountStep> = {
    title: "SurveyStep/ConnectDeviceAccountStep",
    component: ConnectDeviceAccountStep,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof ConnectDeviceAccountStep>;

const render = (args: ConnectDeviceAccountStepProps) => <ConnectDeviceAccountStep {...args} />;

export const GarminDefault: Story = {
    args: {
        title: "Connect Garmin",
        text: "Connect your Garmin account to MyDataHelps to share your activity data.",
        deviceType: "Garmin",
        providerID: 1,
        styles: {},
        onConnect: () => {}
    },
    render: render
};

export const GarminCustom: Story = {
    args: {
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
    },
    render: render
};

export const FitbitDefault: Story = {
    args: {
        title: "Connect Fitbit",
        text: "Connect your Fitbit account to MyDataHelps to share your activity data.",
        deviceType: "Fitbit",
        providerID: 2,
        styles: {},
        onConnect: () => {}
    },
    render: render
};

export const OmronDefault: Story = {
    args: {
        title: "Connect Omron",
        text: "Connect your Omron account to MyDataHelps to share your activity data.",
        deviceType: "Omron",
        providerID: 3,
        styles: {},
        onConnect: () => {}
    },
    render: render
};

export const OuraDefault: Story = {
    args: {
        title: "Connect Oura",
        text: "Connect your Oura account to MyDataHelps to share your activity data.",
        deviceType: "Oura",
        providerID: 4,
        styles: {},
        onConnect: () => {}
    },
    render: render
};