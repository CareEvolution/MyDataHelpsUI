import React from "react";
import ConnectEhrStep, { ConnectEhrStepProps } from "./ConnectEhrStep";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ConnectEhrStep> = {
    title: "SurveyStep/ConnectEhrStep",
    component: ConnectEhrStep,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof ConnectEhrStep>;

const render = (args: ConnectEhrStepProps) => <ConnectEhrStep {...args} />;

export const Default: Story = {
    args: {
        title: "MyDataHelps",
        text: "Connect to EHR",
        previewState: "Default",
        styles: {},
        onProviderConnected: () => { },
        onNextButtonClick: () => { }
    },
    render: render
};

export const Disabled: Story = {
    args: {
        title: "MyDataHelps",
        text: "Connect to EHR",
        previewState: "Default",
        nextButtonDisabled: true,
        styles: {},
        onProviderConnected: () => { },
        onNextButtonClick: () => { }
    },
    render: render
};

export const CustomStyling: Story = {
    args: {
        title: "_MyDataHelps™_",
        text: "Connect to EHR",
        previewState: "Default",
        nextButtonText: "Forward",
        styles: {
            nextButtonBackgroundColor: "#000000",
            nextButtonBackgroundGradient: {
                direction: "LeftToRight",
                endColor: "#0000FF",
                startColor: "#FFFFFF",
            },
            nextButtonLetterSpacing: 10,
            nextButtonTextColor: "#0000FF",
            nextButtonTextTransform: "Uppercase",
            nextButtonFontWeight: "900",
            textAlignment: "Left",
            textColor: "#0000FF",
            textFontSize: "18",
            textFontWeight: "300",
            titleAlignment: "Left",
            titleColor: "#0000FF",
            titleFontSize: "36",
            titleFontWeight: "900",
        },
        onProviderConnected: () => { },
        onNextButtonClick: () => { }
    },
    render: render
};

export const Live: Story = {
    args: {
        title: "MyDataHelps",
        text: "Connect to EHR",
        styles: {},
        onProviderConnected: () => { },
        onNextButtonClick: () => { }
    },
    render: render
};