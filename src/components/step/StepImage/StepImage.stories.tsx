import React from "react";
import StepImage from "./StepImage";
import { IconElementProps } from "../shared"
import StepLayout from "../StepLayout";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StepImage> = {
    title: "SurveyStep/Components/StepImage",
    component: StepImage,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof StepImage>;

const render = (args: IconElementProps) => <StepLayout>
    <StepImage {...args} />
</StepLayout>;

export const Default: Story = {
    args: {
        srcUrl: "https://rkstudio-customer-assets.s3.amazonaws.com/CareEvolution/Images/MDH-Logo-2022.svg"
    },
    render: render
};

export const NoSrc: Story = {
    args: {},
    render: render
};