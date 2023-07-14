import React from "react";
import ConnectGoogleFit, { ConnectGoogleFitProps } from "./ConnectGoogleFit";
import Layout from "../../presentational/Layout";
import { Card } from "../../presentational";

export default { title: "Container/ConnectGoogleFit", component: ConnectGoogleFit, parameters: { layout: 'fullscreen' } };

let render = (args: ConnectGoogleFitProps) => <Layout colorScheme="auto"><Card><ConnectGoogleFit {...args} /></Card></Layout>

export const AndroidEnabled = {
    name: "Android Enabled",
    args: { previewDevicePlatform: "Android", googleFitEnabled: true, enableGoogleFitSurveyName: "Survey" },
    render: render
};
export const AndroidDisabledWithSurvey = {
    name: "Android Disabled With Survey",
    args: { previewDevicePlatform: "Android", googleFitEnabled: false, enableGoogleFitSurveyName: "Survey" },
    render: render
};
export const AndroidUnknown = {
    name: "Android Unknown",
    args: { previewDevicePlatform: "Android" },
    render: render
};
export const Web = {
    name: "Web",
    args: { previewDevicePlatform: "Web" },
    render: render
};
export const iOS = {
    name: "iOS",
    args: { previewDevicePlatform: "iOS" },
    render: render
};
