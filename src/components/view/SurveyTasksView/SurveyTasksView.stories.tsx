import React from "react"
import SurveyTasksView, { SurveyTasksViewProps } from "./SurveyTasksView"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof SurveyTasksView> = {
    title: "View/SurveyTasksView",
    component: SurveyTasksView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof SurveyTasksView>;

const render = (args: SurveyTasksViewProps) => <SurveyTasksView {...args} />;

export const Default: Story = {
    args: {
        preview: true
    },
    render: render
};

export const HideIncomplete: Story = {
    args: {
        preview: true,
        hideIncompleteTasks: true
    },
    render: render
};

export const HideComplete: Story = {
    args: {
        preview: true,
        hideCompleteTasks: true
    },
    render: render
};

export const Live: Story = {
    args: {
        preview: false
    },
    render: render
};