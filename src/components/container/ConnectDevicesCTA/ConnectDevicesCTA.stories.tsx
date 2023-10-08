import React from "react";
import { Card, Layout } from "../../presentational";
import ConnectDevicesCTA, { ConnectDevicesCTAProps } from "./ConnectDevicesCTA";

export default { title: "Container/ConnectDevicesCTA", component: ConnectDevicesCTA, parameters: { layout: 'fullscreen' } };
let render = (args: ConnectDevicesCTAProps) => <Layout><Card><ConnectDevicesCTA {...args} /></Card></Layout>

export const Web = {
    args: {
        previewState: "Web"
    },
    render: render
};

export const CustomLanguage = {
    args: {
        previewState: "Web",
        title: "Custom title",
        text: "Custom text"
    },
    render: render
};

export const MediumHeader = {
    args: {
        previewState: "Web",
        headerVariant: "medium"
    },
    render: render
};