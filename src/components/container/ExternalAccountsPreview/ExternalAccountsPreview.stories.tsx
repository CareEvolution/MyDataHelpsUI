import React from "react"
import ExternalAccountsPreview, { ExternalAccountsPreviewProps } from "./ExternalAccountsPreview"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ExternalAccountsPreview> = {
    title: "Container/ExternalAccountsPreview",
    component: ExternalAccountsPreview,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof ExternalAccountsPreview>;

const render = (args: ExternalAccountsPreviewProps) =>
    <Layout colorScheme="auto">
        <ExternalAccountsPreview {...args} />
    </Layout>;

const baseArgs: ExternalAccountsPreviewProps = {
    previewState: "Default",
    onClick: () => { console.log("PREVIEW: Opening the external accounts application."); },
}
export const Default: Story = {
    args: { ...baseArgs },
    render: render
}

export const ProvidersOnly: Story = {
    args: { ...baseArgs, excludeHealthPlans: true, excludeDeviceManufacturers: true },
    render: render
}

//todo: test this in prev data
export const HealthPlansOnly: Story = {
    args: { ...baseArgs, excludeProviders: true, excludeDeviceManufacturers: true },
    render: render
}

export const DeviceManufacturersOnly: Story = {
    args: { ...baseArgs, excludeProviders: true, excludeHealthPlans: true },
    render: render
}

export const ProvidersAndHealthPlans: Story = {
    args: { ...baseArgs, excludeDeviceManufacturers: true },
    render: render
}

export const ProvidersAndDeviceManufacturers: Story = {
    args: { ...baseArgs, excludeHealthPlans: true },
    render: render
}

export const HealthPlansAndDeviceManufacturers: Story = {
    args: { ...baseArgs, excludeProviders: true },
    render: render
}