import React from "react";
import StepText from "./StepText";
import { StepElementProps } from "../shared"
import StepLayout from "../StepLayout";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StepText> = {
    title: "SurveyStep/Components/StepText",
    component: StepText,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof StepText>;

const render = (args: StepElementProps) => <StepLayout>
    <StepText {...args} />
</StepLayout>;

export const Default: Story = {
    args: {
        text: "This is the text"
    },
    render: render
};

export const Markdown: Story = {
    args: {
        text: "\\*\\*Bold\\*\\*\n**Bold**\n\n\\_Italics\\_\n_Italics_\n\n\\*\\*\\_Bold Italics\\_\\*\\*\n**_Bold Italics_**\n\n\\<http://www.example.com\\>\n<http://www.example.com>\n\n\\<user@example.com>\n<user@example.com>\n\n\\[Example](http://www.example.com)\n[Example](http://www.example.com)\n\n\\[123-555-1234](tel:123-555-1234)\n[123-555-1234](tel:123-555-1234)\n\nBullet list with `+`, `-`, or `*`. Indent 2 spaces for sublist.\n- Level 1, Item A\n- Level 1, Item B\n  - Level 2, Item A\n  - Level 2, Item B\n    - Level 3, Item A"
    },
    render: render
};

export const CustomStyle: Story = {
    args: {
        text: "This is the text",
        textAlign: "Right",
        color: "#00AA00",
        fontSize: "12",
        fontWeight: "100"
    },
    render: render
};