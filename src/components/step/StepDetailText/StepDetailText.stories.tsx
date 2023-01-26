import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StepDetailText from "./StepDetailText";
import {StepElementProps} from "../shared"
import ExampleStep from "../ExampleStep";

export default {
    title: "SurveyStep/Components/StepDetailText",
    component: StepDetailText,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof StepDetailText>;

const Template: ComponentStory<typeof StepDetailText> = (args: StepElementProps) =>
    <ExampleStep>
        <StepDetailText {...args} />
    </ExampleStep>

export const StepDetailTextDefault = Template.bind({});
StepDetailTextDefault.args = {
    text: "This is the detail text"
}

export const StepDetailTextMarkdown = Template.bind({});
StepDetailTextMarkdown.args = {
    text: "\\*\\*Bold\\*\\*\n**Bold**\n\n\\_Italics\\_\n_Italics_\n\n\\*\\*\\_Bold Italics\\_\\*\\*\n**_Bold Italics_**\n\n\\<http://www.example.com\\>\n<http://www.example.com>\n\n\\<user@example.com>\n<user@example.com>\n\n\\[Example](http://www.example.com)\n[Example](http://www.example.com)\n\n\\[123-555-1234](tel:123-555-1234)\n[123-555-1234](tel:123-555-1234)\n\nBullet list with `+`, `-`, or `*`. Indent 2 spaces for sublist.\n- Level 1, Item A\n- Level 1, Item B\n  - Level 2, Item A\n  - Level 2, Item B\n    - Level 3, Item A"
}

export const StepDetailTextCustomStyle = Template.bind({});
StepDetailTextCustomStyle.args = {
    text: "This is the detail text",
    textAlign: "Left",
    color: "#0000FF",
    fontSize: "24",
    fontWeight: "300"
}