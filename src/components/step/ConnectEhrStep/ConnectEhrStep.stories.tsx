import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ConnectEhrStep, { ConnectEhrStepProps } from "./ConnectEhrStep";
import { ExternalAccountProvider } from "@careevolution/mydatahelps-js";

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
    previewState: "Default",
    styles: {},
    onProviderSelected: () => {},
};

export const ConnectEhrStepDisabled = Template.bind({});
ConnectEhrStepDisabled.args = {
    title: "MyDataHelps",
    text: "Connect to EHR",
    previewState: "Default",
    nextButtonDisabled: true,
    styles: {},
    onProviderSelected: () => {},
};

export const ConnectEhrStepCustomStyling = Template.bind({});
ConnectEhrStepCustomStyling.args = {
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
    onProviderSelected: () => {},
};

export const ConnectEhrStepOnProviderSelected = Template.bind({});
ConnectEhrStepOnProviderSelected.args = {
    title: "MyDataHelps",
    text: "Connect to EHR",
    previewState: "Default",
    styles: {},
    onProviderSelected: (provider: ExternalAccountProvider) => {alert(`You have selected ${provider.name} as your provider.`)},
};

export const ConnectEhrStepLive = Template.bind({});
ConnectEhrStepLive.args = {
    title: "MyDataHelps",
    text: "Connect to EHR",
    styles: {},
    onProviderSelected: (provider: ExternalAccountProvider) => {alert(`You have selected ${provider.name} as your provider.`)},
};
