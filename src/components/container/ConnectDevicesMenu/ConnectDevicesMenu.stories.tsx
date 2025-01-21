import React from "react";
import { Card, Layout } from "../../presentational";
import ConnectDevicesMenu, { ConnectDevicesMenuProps } from "./ConnectDevicesMenu";
import { Description } from "@storybook/blocks";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof ConnectDevicesMenu> = {
    title: "Container/ConnectDevicesMenu",
    component: ConnectDevicesMenu,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof ConnectDevicesMenu>;

const render = (args: ConnectDevicesMenuProps) => <Layout colorScheme="auto"><Card><ConnectDevicesMenu {...args} /></Card></Layout>;

export const Web: Story = {
    args: {
        previewState: "Web"
    },
    render: render
}

export const iOS: Story = {
    args: {
        previewState: "iOS"
    },
    render: render
}

export const Android: Story = {
    args: {
        previewState: "Android"
    },
    render: render
}


export const ConnectedStates: Story = {
    args: {
        previewState: "ConnectedStates",
        accountTypes: ["Omron", "AppleHealth", "GoogleFit", "Fitbit", "Garmin", "Dexcom"]
    },
    render: render
}

export const CustomLanguage: Story = {
    args: {
        previewState: "Web",
        title: "Custom title",
        text: "Custom text"
    },
    render: render
}

export const MediumHeader: Story = {
    args: {
        previewState: "Web",
        headerVariant: "medium"
    },
    render: render
}

export const Live: Story = {
    args: {},
    render: render
}
