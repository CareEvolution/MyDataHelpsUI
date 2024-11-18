﻿import React from "react";
import StepNextButton, { StepNextButtonProps } from "./StepNextButton";
import StepLayout from "../StepLayout";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StepNextButton> = {
    title: "SurveyStep/Components/StepNextButton",
    component: StepNextButton,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof StepNextButton>;

const render = (args: StepNextButtonProps) => <StepLayout>
    <StepNextButton {...args} />
</StepLayout>;

export const Default: Story = {
    args: {
        onClick: () => alert("You clicked the Next button")
    },
    render: render
};

export const CustomText: Story = {
    args: {
        text: "Onward",
        onClick: () => alert("You clicked the Onward button")
    },
    render: render
};

export const CustomStyle: Story = {
    args: {
        color: "#FF0000",
        fontWeight: "900",
        backgroundColor: "#0000FF",
        textTransform: "uppercase",
        letterSpacing: "10px",
        onClick: () => alert("You clicked the Next button")
    },
    render: render
};

export const Gradient: Story = {
    args: {
        gradient: {
            direction: "TopToBottom",
            endColor: "#000000",
            startColor: "#ffffff"
        },
        onClick: () => alert("You clicked the pretty button")
    },
    render: render
};

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: render
};