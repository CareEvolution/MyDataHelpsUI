import React from "react";
import ConnectDevices, { ConnectDevicesProps } from "./ConnectDevices";
import Layout from "../../presentational/Layout";
import { Card } from "../../presentational";

export default { title: "Container/ConnectDevices", component: ConnectDevices, parameters: { layout: 'fullscreen' } };
let render = (args: ConnectDevicesProps) => <Layout colorScheme="auto"><Card><ConnectDevices {...args} /></Card></Layout>
export const HomeCollapsed = {
    name: "Home Collapsed",
    args: { connectDevicesViewUrl: "test", previewState: "All Devices", previewDevicePlatform: "Web" },
    render: render
};