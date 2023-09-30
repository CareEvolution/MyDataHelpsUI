import React from "react";
import { Card, Layout } from "../../presentational";
import ConnectDevicesMenu, { ConnectDevicesMenuProps } from "./ConnectDevicesMenu";

export default { title: "Container/ConnectDevicesMenu", component: ConnectDevicesMenu, parameters: { layout: 'fullscreen' } };
let render = (args: ConnectDevicesMenuProps) => <Layout><Card><ConnectDevicesMenu {...args} /></Card></Layout>

export const Web = {
    args: {
        previewState: "Web"
    },
    render: render
};

export const iOS = {
    name:"iOS",
    args: {
        previewState: "iOS"
    },
    render: render
};

export const Connected = {
    args: {
        previewState: "Connected"
    },
    render: render
};
