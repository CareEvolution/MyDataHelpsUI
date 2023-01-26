import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StepTitle from "./StepTitle";
import {StepElementProps} from "../shared"
import ExampleStep from "../ExampleStep";

export default {
    title: "SurveyStep/Components/StepTitle",
    component: StepTitle,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof StepTitle>;

const Template: ComponentStory<typeof StepTitle> = (args: StepElementProps) =>
    <ExampleStep>
        <StepTitle {...args} />
    </ExampleStep>

export const StepTitleDefault = Template.bind({});
StepTitleDefault.args = {
    text: "This is the title"
}

export const StepTitleMarkdownItalics = Template.bind({});
StepTitleMarkdownItalics.args = {
    text: "This is _the title_"
}

export const StepTitleCustomStyle = Template.bind({});
StepTitleCustomStyle.args = {
    text: "This is the title",
    textAlign: "Left",
    color: "#FF0000",
    fontSize: "72",
    fontWeight: "900"
}