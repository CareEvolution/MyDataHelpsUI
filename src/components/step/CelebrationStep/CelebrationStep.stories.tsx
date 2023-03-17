import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CelebrationStep, { CelebrationStepProps } from "./CelebrationStep";

export default {
    title: "SurveyStep/CelebrationStep",
    component: CelebrationStep,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof CelebrationStep>;

const Template: ComponentStory<typeof CelebrationStep> = (args: CelebrationStepProps) =>
    <CelebrationStep {...args} />

export const CelebrationStepDefault = Template.bind({});
CelebrationStepDefault.args = {
    title: "Thank You!",
    text: "We appreciate your participation",
    detailText: "We will be in touch soon",
    iconUrl: "https://rkstudio-customer-assets.s3.amazonaws.com/CareEvolution/Images/CE-Logo-2022.png",
    imageUrl: "https://rkstudio-customer-assets.s3.amazonaws.com/CareEvolution/Images/MDH-Logo-2022.svg",
    styles: {}
}

export const CelebrationStepCustomStyling = Template.bind({});
CelebrationStepCustomStyling.args = {
    title: "_Thank You!_",
    text: "We **appreciate** your participation",
    detailText: "We will be in touch soon**™**",
    nextButtonText: "Forward",
    styles: {
        "detailTextAlignment": "Left",
        "detailTextColor": "#0000FF",
        "detailTextFontSize": "12",
        "detailTextFontWeight": "100",
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
    }
}

export const CelebrationStepEmpty = Template.bind({});
CelebrationStepEmpty.args = {
    styles: {}
}