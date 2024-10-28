import React from "react"
import ConnectFitbit, { ConnectFitbitProps } from "./ConnectFitbit"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react/*";


const meta: Meta<typeof ConnectFitbit> = {
    title: "Container/ConnectFitbit",
    component: ConnectFitbit,
    parameters: {
        layout: 'fullscreen',
        docs: {

        }
    }
};

export default meta;
type Story = StoryObj<typeof ConnectFitbit>;

const render = (args: ConnectFitbitProps) => <Layout colorScheme="auto">
    <Card>
        <ConnectFitbit {...args} />
    </Card>
</Layout>;

export const NotConnected: Story = {
    args: {
        previewState: "notConnected",
        title: "Fitbit"
    },
    render: render
};

export const Unauthorized: Story = {
    args: {
        previewState: "unauthorized",
        title: "Fitbit"
    },
    render: render
};

export const ConnectionError: Story = {
    args: {
        previewState: "error",
        title: "Fitbit"
    },
    render: render
};

export const FetchComplete: Story = {
    args: {
        previewState: "fetchComplete",
        title: "Fitbit"
    },
    render: render
};

export const FetchingData: Story = {
    args: {
        previewState: "fetchingData",
        title: "Fitbit"
    },
    render: render
};

export const NotEnabledDefault: Story = {
    args: {
        previewState: "notEnabled",
        title: "Fitbit"
    },
    render: render
};

export const NotEnabledHide: Story = {
    args: {
        previewState: "notEnabled",
        title: "Fitbit",
        disabledBehavior: "hide"
    },
    render: render
};

export const NotEnabledDisplayError: Story = {
    args: {
        previewState: "notEnabled",
        title: "Fitbit",
        disabledBehavior: "displayError"
    },
    render: render
};

export const HideConnected: Story = {
    args: {
        previewState: "fetchComplete",
        hideWhenConnected: true
    },
    argTypes: {
        previewState: { name: "Connection State", control: "radio", options: ["fetchComplete", "fetchingData", "unauthorized", "error"] }
    },
    render: render
};