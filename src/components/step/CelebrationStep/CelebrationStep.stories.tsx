import React from "react";
import CelebrationStep, { CelebrationStepProps } from "./CelebrationStep";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CelebrationStep> = {
    title: "SurveyStep/CelebrationStep",
    component: CelebrationStep,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof CelebrationStep>;

const render = (args: CelebrationStepProps) => <CelebrationStep {...args} />;

export const Default: Story = {
    args: {
        title: "Thank You!",
        text: "We appreciate your participation",
        detailText: "We will be in touch soon",
        iconUrl: "https://rkstudio-customer-assets.s3.amazonaws.com/CareEvolution/Images/CE-Logo-2022.png",
        imageUrl: "https://rkstudio-customer-assets.s3.amazonaws.com/CareEvolution/Images/MDH-Logo-2022.svg",
        styles: {}
    },
    render: render
};

export const CustomStyling: Story = {
    args: {
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
    },
    render: render
};
export const Empty: Story = {
    args: {
        styles: {}
    },
    render: render
};