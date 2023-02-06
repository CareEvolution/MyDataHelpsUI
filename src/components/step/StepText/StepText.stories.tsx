import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StepText from "./StepText";
import {StepElementProps} from "../shared"
import StepLayout from "../StepLayout";

export default {
    title: "SurveyStep/Components/StepText",
    component: StepText,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof StepText>;

const Template: ComponentStory<typeof StepText> = (args: StepElementProps) =>
    <StepLayout>
        <StepText {...args} />
    </StepLayout>

export const StepTextDefault = Template.bind({});
StepTextDefault.args = {
    text: "This is the text"
}

export const StepTextMarkdown = Template.bind({});
StepTextMarkdown.args = {
    text: "\\*\\*Bold\\*\\*\n**Bold**\n\n\\_Italics\\_\n_Italics_\n\n\\*\\*\\_Bold Italics\\_\\*\\*\n**_Bold Italics_**\n\n\\<http://www.example.com\\>\n<http://www.example.com>\n\n\\<user@example.com>\n<user@example.com>\n\n\\[Example](http://www.example.com)\n[Example](http://www.example.com)\n\n\\[123-555-1234](tel:123-555-1234)\n[123-555-1234](tel:123-555-1234)\n\nBullet list with `+`, `-`, or `*`. Indent 2 spaces for sublist.\n- Level 1, Item A\n- Level 1, Item B\n  - Level 2, Item A\n  - Level 2, Item B\n    - Level 3, Item A"
}

export const StepTextCustomStyle = Template.bind({});
StepTextCustomStyle.args = {
    text: "This is the text",
    textAlign: "Right",
    color: "#00AA00",
    fontSize: "12",
    fontWeight: "100"
}