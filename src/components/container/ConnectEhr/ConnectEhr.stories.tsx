import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import ConnectEhr, { ConnectEhrProps } from "./ConnectEhr";


export default {
    title: "Container/ConnectEhr",
    component: ConnectEhr,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: ConnectEhrProps) => <Layout colorScheme="auto"><Card><ConnectEhr {...args} /></Card></Layout>


export const NotEnabledDefault = {
    args: {
        previewState: "notEnabled"
    },
    render: render
};

export const NotEnabledHide = {
    args: { previewState: "notEnabled", disabledBehavior: "hide" },
    render: render
};

export const Medium = {
    args: {
        previewState: "enabled",
        variant: "medium"
    },
    render: render
};


export const Small = {
    args: {
        previewState: "enabled",
        variant: "small"
    },
    render: render
};


export const NotEnabledDisplayError = {
    args: { previewState: "notEnabled", disabledBehavior: "displayError" },
    render: render
};

export const Enabled = {
    args: { previewState: "enabled", applicationUrl: "preview" },
    render: render
};

export const EnabledConnected = {
    args: { previewState: "enabledConnected", applicationUrl: "preview" },
    render: render
};

export const EnabledNeedsAttention = {
    args: { previewState: "enabledNeedsAttention", applicationUrl: "preview" },
    render: render
};

export const Live = {
    args: { disabledBehavior: "displayError", applicationUrl: "preview" },
    render: render
};

export const CustomConnectedText = {
    args: { previewState: "enabledConnected", applicationUrl: "preview", title:"Custom title", connectedText: "Thanks for connecting your EHR!" },
    render: render
};

export const CustomConnectText = {
    args: { previewState: "enabled", applicationUrl: "preview", title:"Custom title", connectedText: "Connect your EHR title" },
    render: render
};

