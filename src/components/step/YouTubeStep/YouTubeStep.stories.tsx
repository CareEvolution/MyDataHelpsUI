import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import YouTubeStep, { YouTubeStepProps } from "./YouTubeStep";

export default {
    title: "SurveyStep/YouTubeStep",
    component: YouTubeStep,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof YouTubeStep>;

const Template: ComponentStory<typeof YouTubeStep> = (args: YouTubeStepProps) =>
    <YouTubeStep {...args} />

export const YouTubeStepDefault = Template.bind({});
YouTubeStepDefault.args = {
    properties: {
        "title": "MyDataHelps",
        "text": "Meet Participants Where They Are",
        "transcript": "Meet participants where they are with MyDataHelps™—your one-stop digital health platform for conducting clinical research, clinical trials, and wellness projects! eConsent and enroll participants, collect digital biomarkers, automate survey delivery, and begin analyzing digital phenotype and EHR data in hours.",
        "videoId": "Ee3x4oK_qv8"
    },
    styles: {}
}

export const YouTubeStepCustomStyling = Template.bind({});
YouTubeStepCustomStyling.args = {
    properties: {
        "title": "_MyDataHelps™_",
        "text": "Meet Participants Where They **Are**",
        "nextButtonText": "Forward",
        "transcript": "Meet participants where they are with _MyDataHelps™_—your one-stop digital health platform for conducting clinical research, clinical trials, and wellness projects! eConsent and enroll participants, collect digital biomarkers, automate survey delivery, and begin analyzing digital phenotype and EHR data in hours. Read more [here](https://careevolution.com/mydatahelps/).",
        "height": "500",
        "videoId": "Ee3x4oK_qv8"
    },
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

export const YouTubeStepEmpty = Template.bind({});
YouTubeStepEmpty.args = {
    properties: {"videoId": "Ee3x4oK_qv8"},
    styles: {}
}