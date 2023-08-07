import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ConnectEhrStep, { ConnectEhrStepProps } from "./ConnectEhrStep";

export default {
    title: "SurveyStep/ConnectEhrStep",
    component: ConnectEhrStep,
    parameters: {
        layout: "fullscreen",
    },
} as ComponentMeta<typeof ConnectEhrStep>;

const Template: ComponentStory<typeof ConnectEhrStep> = (
    args: ConnectEhrStepProps
) => <ConnectEhrStep {...args} />;

export const ConnectEhrStepDefault = Template.bind({});
ConnectEhrStepDefault.args = {
    title: "MyDataHelps",
    text: "Connect to EHR",
    preview: true,
    styles: {},
};

export const ConnectEhrStepCustomStyling = Template.bind({});
ConnectEhrStepCustomStyling.args = {
    title: "_MyDataHelps™_",
    text: "Connect to EHR",
    preview: true,
    nextButtonText: "Forward",
    styles: {
    detailTextAlignment: "Left",
    detailTextColor: "#0000FF",
    detailTextFontSize: "12",
    detailTextFontWeight: "100",
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
};

export const ConnectEhrStepLive = Template.bind({});
ConnectEhrStepLive.args = {
    title: "MyDataHelps",
    text: "Connect to EHR",
    preview: false,
    styles: {},
};
