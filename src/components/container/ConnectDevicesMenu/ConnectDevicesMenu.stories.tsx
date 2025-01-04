import React from "react";
import { Card, Layout } from "../../presentational";
import ConnectDevicesMenu, { ConnectDevicesMenuProps } from "./ConnectDevicesMenu";

export default { title: "Container/ConnectDevicesMenu", component: ConnectDevicesMenu, parameters: { layout: 'fullscreen' } };
let render = (args: ConnectDevicesMenuProps) => <Layout colorScheme="auto"><Card><ConnectDevicesMenu {...args} /></Card></Layout>

export const Web = {
    args: {
        previewState: "Web"
    },
    render: render
};

export const iOS = {
    name: "iOS",
    args: {
        previewState: "iOS"
    },
    render: render
};

export const Android = {
    name: "Android",
    args: {
        previewState: "Android"
    },
    render: render
};

export const ConnectedStates = {
    args: {
        previewState: "ConnectedStates",
        accountTypes: ["Omron", "AppleHealth", "GoogleFit", "Fitbit", "Garmin", "Dexcom"]
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

export const AppleHealthConnected = {
    name: "Apple Health Connected",
    args: {
        previewState: "iOSConnected"
    },
    render: render
};

export const iOSEnableAppleHealthSurvey = {
    name: "Enable Apple Health Survey",
    args: {
        previewState: "iOS",
        enableAppleHealthSurvey: "EnableAppleHealth"
    },
    render: render
};

export const AndroidEnableAppleHealthSurvey = {
    name: "Enable Google Fit Survey",
    args: {
        previewState: "Android",
        enableGoogleFitSurvey: "EnableGoogleFit"
    },
    render: render
};

export const Live = {
    args: {
    },
    render: render
};