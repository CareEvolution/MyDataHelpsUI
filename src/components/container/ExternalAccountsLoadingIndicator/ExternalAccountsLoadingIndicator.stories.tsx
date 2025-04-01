import React from "react"
import ExternalAccountsLoadingIndicator, { ExternalAccountsLoadingIndicatorProps } from "./ExternalAccountsLoadingIndicator"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ExternalAccountsLoadingIndicator> = {
    title: "Container/ExternalAccountsLoadingIndicator",
    component: ExternalAccountsLoadingIndicator,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof ExternalAccountsLoadingIndicator>;

const render = (args: ExternalAccountsLoadingIndicatorProps) =>
    <Layout colorScheme="auto">
        <ExternalAccountsLoadingIndicator {...args} />
    </Layout>;

export const ExternalAccountsFetchingData: Story = {
    args: {
        previewState: "externalAccountsFetchingData"
    },
    render: render
}

export const ExternalAccountsFetchComplete: Story = {
    args: {
        previewState: "externalAccountsLoaded"
    },
    render: render
}

export const Live: Story = {
    args: {},
    render: render
}