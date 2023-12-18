import React from "react";
import { Layout } from "../../presentational";
import EhrNewsFeedEventDetailView, { EhrNewsFeedEventDetailViewProps } from "./EhrNewsFeedEventDetailView";

export default { title: "View/EhrNewsFeedEventDetailView", component: EhrNewsFeedEventDetailView, parameters: { layout: 'fullscreen' } };
let render = (args: EhrNewsFeedEventDetailViewProps) =>  <EhrNewsFeedEventDetailView {...args} />

export const ProcedureGroup = {
    args: {
        previewState: "ProcedureGroup",
        presentation: "Modal"
    },
    render: render
};

export const LabReport = {
    args: {
        previewState: "LabReport",
        presentation: "Modal"
    },
    render: render
};

export const ClaimServiceGroup = {
    args: {
        previewState: "ClaimServiceGroup",
        presentation: "Modal"
    },
    render: render
};

export const ClaimProcedureGroup = {
    args: {
        previewState: "ClaimProcedureGroup",
        presentation: "Modal"
    },
    render: render
};

