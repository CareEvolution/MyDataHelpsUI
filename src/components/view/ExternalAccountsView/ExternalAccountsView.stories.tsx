﻿import React from "react"
import ExternalAccountsView, { ExternalAccountsViewProps } from "./ExternalAccountsView";
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof ExternalAccountsView> = {
    title: "View/ExternalAccountsView",
    component: ExternalAccountsView,
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;
type Story = StoryObj<typeof ExternalAccountsView>;

const render = (args: ExternalAccountsViewProps) => <ExternalAccountsView {...args} />;

export const Default: Story = {
    args: {
        previewState: "default",
        presentation: "Push"
    },
    render: render
};

export const ProvidersOnly: Story = {
    args: {
        previewState: "default",
        presentation: "Push",
        excludeHealthPlans: true,
        excludeDeviceManufacturers: true
    },
    render: render
};

export const HealthPlansOnly: Story = {
    args: {
        previewState: "default",
        presentation: "Push",
        excludeProviders: true,
        excludeDeviceManufacturers: true
    },
    render: render
};

export const DeviceManufacturersOnly: Story = {
    args: {
        previewState: "default",
        presentation: "Push",
        excludeProviders: true,
        excludeHealthPlans: true
    },
    render: render
};

export const ProvidersAndHealthPlans: Story = {
    args: {
        previewState: "default",
        presentation: "Push",
        excludeDeviceManufacturers: true
    },
    render: render
};

export const ProvidersAndDeviceManufacturers: Story = {
    args: {
        previewState: "default",
        presentation: "Push",
        excludeHealthPlans: true
    },
    render: render
};

export const HealthPlansAndDeviceManufacturers: Story = {
    args: {
        previewState: "default",
        presentation: "Push",
        excludeProviders: true
    },
    render: render
};

export const Live: Story = {
    args: {
        presentation: "Push"
    },
    render: render
};