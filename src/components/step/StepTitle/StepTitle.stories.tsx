import React from "react";
import StepTitle from "./StepTitle";
import { StepElementProps } from "../shared"
import StepLayout from "../StepLayout";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StepTitle> = {
    title: "SurveyStep/Components/StepTitle",
    component: StepTitle,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof StepTitle>;

const render = (args: StepElementProps) => <StepLayout>
    <StepTitle {...args} />
</StepLayout>;

export const Default: Story = {
    args: {
        text: "This is the title"
    },
    render: render
};

export const StepTitleMarkdownItalics: Story = {
    args: {
        text: "This is _the title_"
    },
    render: render
};

export const StepTitleCustomStyle: Story = {
    args: {
        text: "This is the title",
        textAlign: "Left",
        color: "#FF0000",
        fontSize: "72",
        fontWeight: "900"
    },
    render: render
};