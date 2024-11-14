import React from "react"
import NotificationsView, { NotificationsViewProps } from "./NotificationsView"
import { Card, Layout } from "../../presentational"
import { Meta, StoryObj } from "@storybook/react/*"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof NotificationsView> = {
    title: "View/NotificationsView",
    component: NotificationsView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof NotificationsView>;

const render = (args: NotificationsViewProps) => <NotificationsView {...args} />;

export const Default: Story = {
    args: {
        preview: true
    },
    render: render
};

export const Live: Story = {
    args: {
        preview: false
    },
    render: render
};