import React from "react";
import ConnectAppleHealth, { ConnectAppleHealthProps } from "./ConnectAppleHealth";
import Layout from "../../presentational/Layout";
import { Card } from "../../presentational";

export default { title: "Container/ConnectAppleHealth", component: ConnectAppleHealth, parameters: { layout: 'fullscreen' } };
let render = (args: ConnectAppleHealthProps) => <Layout colorScheme="auto"><Card><ConnectAppleHealth {...args} /></Card></Layout>
export const iOSEnabled = {
    name: "iOS Enabled",
    args: { previewDevicePlatform: "iOS", appleHealthEnabled: true, enableAppleHealthSurveyName: "Survey" },
    render: render
};
export const iOSDisabledWithSurvey = {
    name: "iOS Disabled With Survey",
    args: { previewDevicePlatform: "iOS", appleHealthEnabled: false, enableAppleHealthSurveyName: "Survey" },
    render: render
};
export const iOSUnknown = {
    name: "iOS Unknown",
    args: { previewDevicePlatform: "iOS" },
    render: render
};
export const Web = {
    name: "Web",
    args: { previewDevicePlatform: "Web" },
    render: render
};
export const Android = {
    name: "Android",
    args: { previewDevicePlatform: "Android" },
    render: render
};
