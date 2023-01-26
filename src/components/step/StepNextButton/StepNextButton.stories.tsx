import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StepNextButton, {StepNextButtonProps} from "./StepNextButton";
import ExampleStep from "../ExampleStep";

export default {
    title: "SurveyStep/Components/StepNextButton",
    component: StepNextButton,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof StepNextButton>;

const Template: ComponentStory<typeof StepNextButton> = (args: StepNextButtonProps) =>
    <ExampleStep>
        <StepNextButton {...args} />
    </ExampleStep>

export const StepNextButtonDefault = Template.bind({});
StepNextButtonDefault.args = {
    onClick: () => alert("You clicked the Next button")
}

export const StepNextButtonCustomText = Template.bind({});
StepNextButtonCustomText.args = {
    text: "Onward",
    onClick: () => alert("You clicked the Onward button")
}

export const StepNextButtonCustomStyle = Template.bind({});
StepNextButtonCustomStyle.args = {
    color: "#FF0000",
    fontWeight: "900",
    backgroundColor: "#0000FF",
    textTransform: "uppercase",
    letterSpacing: "10px",
    onClick: () => alert("You clicked the Next button")
}

export const StepNextButtonGradient = Template.bind({});
StepNextButtonGradient.args = {
    gradient: {
        direction: "TopToBottom",
        endColor: "#000000",
        startColor: "#ffffff"
    },
    onClick: () => alert("You clicked the pretty button")
}