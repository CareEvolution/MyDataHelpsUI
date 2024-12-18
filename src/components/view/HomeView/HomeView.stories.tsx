﻿import React from "react"
import HomeView, { HomeViewProps } from "./HomeView"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof HomeView> = {
    title: "View/HomeView",
    component: HomeView,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof HomeView>;

const render = (args: HomeViewProps) => <HomeView {...args} />;

export const Default: Story = {
    args: {
        preview: true,
        notificationsViewUrl: "test.html",
        ehrConnectApplicationUrl: "test.html"
    },
    render: render
};

export const Live: Story = {
    args: {
        preview: false,
        notificationsViewUrl: "test.html"
    },
    render: render
}