import React from "react"
import HealthConnectPhrSync, { HealthConnectPhrSyncProps } from "./HealthConnectPhrSync";
import { Card, Layout } from "../../presentational";

export default {
    title: "Container/HealthConnectPhrSync",
    component: HealthConnectPhrSync,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: HealthConnectPhrSyncProps) => <Layout colorScheme="auto">
    <Card><HealthConnectPhrSync {...args} /></Card>
</Layout>;

export const NoPermissionsEnabled = {
    args: {
        previewState: "noPermissionsEnabled"
    },
    render: render
};

export const EnabledPermissions = {
    args: {
        previewState: "permissionsEnabled"
    },
    render: render
};

export const Running = {
    args: {
        previewState: "running"
    },
    render: render
};

