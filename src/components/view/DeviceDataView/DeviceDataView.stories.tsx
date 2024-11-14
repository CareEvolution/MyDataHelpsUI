import React from "react"
import DeviceDataView, { DeviceDataViewProps } from "./DeviceDataView"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof DeviceDataView> = {
    title: "View/DeviceDataView",
    component: DeviceDataView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof DeviceDataView>;

const render = (args: DeviceDataViewProps) => <DeviceDataView {...args} />;

export const Preview: Story = {
    args: {
        preview: true,
    },
    render: render
};

export const Live: Story = {
    args: {
        preview: false,
    },
    render: render
};