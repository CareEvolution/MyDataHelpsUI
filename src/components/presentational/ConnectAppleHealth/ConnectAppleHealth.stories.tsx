import React from "react";
import ConnectAppleHealth, { ConnectAppleHealthProps } from "./ConnectAppleHealth";
import Layout from "../Layout";

export default { title: "Presentational/ConnectAppleHealth", component: ConnectAppleHealth, parameters: { layout: 'fullscreen' } };
export const iOSEnabled = {
    name: "iOS Enabled",
    args: { previewDevicePlatform: "iOS", appleHealthEnabled: true, enableAppleHealthSurveyName: "Survey" },
    render: (args: ConnectAppleHealthProps) => <Layout colorScheme="auto"><ConnectAppleHealth {...args} /></Layout>
};
export const iOSDisabledWithSurvey = {
    name: "iOS Disabled With Survey",
    args: { previewDevicePlatform: "iOS", appleHealthEnabled: false, enableAppleHealthSurveyName: "Survey" },
    render: (args: ConnectAppleHealthProps) => <Layout colorScheme="auto"><ConnectAppleHealth {...args} /></Layout>
};
export const iOSUnknown = {
    name: "iOS Unknown",
    args: { previewDevicePlatform: "iOS" },
    render: (args: ConnectAppleHealthProps) => <Layout colorScheme="auto"><ConnectAppleHealth {...args} /></Layout>
};
export const Web = {
    name: "Web",
    args: { previewDevicePlatform: "Web" },
    render: (args: ConnectAppleHealthProps) => <Layout colorScheme="auto"><ConnectAppleHealth {...args} /></Layout>
};
export const Android = {
    name: "Android",
    args: { previewDevicePlatform: "Android" },
    render: (args: ConnectAppleHealthProps) => <Layout colorScheme="auto"><ConnectAppleHealth {...args} /></Layout>
};
