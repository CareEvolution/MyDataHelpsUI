import React from "react"
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

let onClick = () => { console.log("PREVIEW: Opening the connect EHR application.") };

export const Enabled = {
    args: { previewState: "enabled", onClick: onClick },
    render: render
};

export const EnabledConnected = {
    args: { previewState: "enabledConnected", onClick: onClick },
    render: render
};

export const EnabledNeedsAttention = {
    args: { previewState: "enabledNeedsAttention", onClick: onClick },
    render: render
};

export const Live = {
    args: { disabledBehavior: "displayError", onClick: onClick },
    render: render
};

export const CustomConnectedText = {
    args: { previewState: "enabledConnected", onClick: onClick, title: "Custom title", connectedText: "Thanks for connecting your EHR!" },
    render: render
};

export const CustomConnectText = {
    args: { previewState: "enabled", onClick: onClick, title: "Custom title", connectedText: "Connect your EHR title" },
    render: render
};

export const HideConnected = {
    args: { previewState: "enabledConnected", applicationUrl: "preview", hideWhenConnected: true },
    argTypes: { previewState: { name: "Connection State", control: "radio", options: ["enabled", "enabledConnected", "enabledNeedsAttention", "notEnabled"] } },
    render: render
};
