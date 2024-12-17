import React from "react";
import StepImageIcon from "./StepImageIcon";
import { IconElementProps } from "../shared"
import StepLayout from "../StepLayout";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StepImageIcon> = {
    title: "SurveyStep/Components/StepImageIcon",
    component: StepImageIcon,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof StepImageIcon>;

const render = (args: IconElementProps) => <StepLayout>
    <StepImageIcon {...args} />
</StepLayout>;

export const Default: Story = {
    args: {
        srcUrl: "https://rkstudio-customer-assets.s3.amazonaws.com/CareEvolution/Images/CE-Logo-2022.png"
    },
    render: render
};

export const NoSrc: Story = {
    args: {},
    render: render
};