import React from "react"
import ExternalAccountList, { ExternalAccountListProps } from "./ExternalAccountList"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof ExternalAccountList> = {
    title: "Container/ExternalAccountList",
    component: ExternalAccountList,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof ExternalAccountList>;

const render = (args: ExternalAccountListProps) =>
    <Layout colorScheme="auto">
        <ExternalAccountList {...args} />
    </Layout>;

const baseArgs: ExternalAccountListProps = {
    previewState: "default",
    externalAccountProviderCategories: []
};

export const Default: Story = {
    args: { ...baseArgs, externalAccountProviderCategories: ["Provider", "Health Plan", "Device Manufacturer"] },
    render: render
}

export const ProvidersOnly: Story = {
    args: { ...baseArgs, externalAccountProviderCategories: ["Provider"] },
    render: render
}

export const HealthPlansOnly: Story = {
    args: { ...baseArgs, externalAccountProviderCategories: ["Health Plan"] },
    render: render
}

export const DeviceManufacturersOnly: Story = {
    args: { ...baseArgs, externalAccountProviderCategories: ["Device Manufacturer"] },
    render: render
}

export const ProvidersAndHealthPlans: Story = {
    args: { ...baseArgs, externalAccountProviderCategories: ["Provider", "Health Plan"] },
    render: render
}

export const ProvidersAndDeviceManufacturers: Story = {
    args: { ...baseArgs, externalAccountProviderCategories: ["Provider", "Device Manufacturer"] },
    render: render
}

export const HealthPlansAndDeviceManufacturers: Story = {
    args: { ...baseArgs, externalAccountProviderCategories: ["Health Plan", "Device Manufacturer"] },
    render: render
}

export const Live: Story = {
    args: {
        externalAccountProviderCategories: ["Provider", "Health Plan", "Device Manufacturer"]
    },
    render: render
}