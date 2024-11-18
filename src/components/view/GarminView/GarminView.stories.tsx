import React from "react"
import GarminView, { GarminViewProps } from "./GarminView"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof GarminView> = {
    title: "View/GarminView",
    component: GarminView,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof GarminView>;

const render = (args: GarminViewProps) => <GarminView {...args} />;

export const NotEnabled: Story = {
    args: {
        connectPreview: "notEnabled",
        devicesPreview: "notEnabled",
        chartsPreview: "notEnabled"
    },
    render: render
};

export const NotConnected: Story = {
    args: {
        connectPreview: "notConnected",
        devicesPreview: "notConnected",
        chartsPreview: "notConnected"
    },
    render: render
};

export const Connected: Story = {
    args: {
        connectPreview: "fetchComplete",
        devicesPreview: "connected",
        chartsPreview: "connected"
    },
    render: render
};

export const Live: Story = {
    args: {},
    render: render
};