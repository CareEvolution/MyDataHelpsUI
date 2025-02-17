import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import ViewDeviceActivity, { ViewDeviceActivityProps } from "./ViewDeviceActivity";

export default {
    title: "Container/ViewDeviceActivity",
    component: ViewDeviceActivity,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: ViewDeviceActivityProps) => <Layout colorScheme="auto"><Card><ViewDeviceActivity {...args} /></Card></Layout>

export const Loading = {
    args: {
        previewState: "fetchingData"
    },
    render: render
};


export const Loaded = {
    args: {
        previewState: "fetchComplete"
    },
    render: render
};