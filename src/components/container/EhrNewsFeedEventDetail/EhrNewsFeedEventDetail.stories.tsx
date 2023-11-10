import React from "react";
import { Layout } from "../../presentational";
import EhrNewsFeedEventDetail, { EhrNewsFeedEventDetailProps } from "./EhrNewsFeedEventDetail";

export default { title: "Container/EhrNewsFeedEventDetail", component: EhrNewsFeedEventDetail, parameters: { layout: 'fullscreen' } };
let render = (args: EhrNewsFeedEventDetailProps) => <Layout colorScheme="auto">
    <EhrNewsFeedEventDetail {...args} />
</Layout>

export const ProcedureGroup = {
    args: {
        previewState: "ProcedureGroup"
    },
    render: render
};

export const LabReport = {
    args: {
        previewState: "LabReport"
    },
    render: render
};

export const ClaimServiceGroup = {
    args: {
        previewState: "ClaimServiceGroup"
    },
    render: render
};

export const ClaimProcedureGroup = {
    args: {
        previewState: "ClaimProcedureGroup"
    },
    render: render
};

