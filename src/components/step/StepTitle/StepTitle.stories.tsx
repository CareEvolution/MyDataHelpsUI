import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StepTitle from "./StepTitle";
import {StepElementProps} from "../shared"
import StepLayout from "../StepLayout";
import StepStyle from "../StepStyle";

export default {
    title: "SurveyStep/Components/StepTitle",
    component: StepTitle,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof StepTitle>;

const Template: ComponentStory<typeof StepTitle> = (args: StepElementProps) =>
    <StepLayout>
        <StepTitle {...args} />
        <StepStyle 
              titleAlignment="Right"
              titleColor="Pink"
              titleFontSize="100"
              titleFontWeight="100"
              ></StepStyle>
    </StepLayout>

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
    text: "This is the title"
}