import React from "react";
import { Layout } from "../../../presentational";
import EventDetail, { EventDetailProps } from "./EventDetail";

export default { title: "EhrNewsFeed/Container/EventDetail", component: EventDetail, parameters: { layout: 'fullscreen' } };
let render = (args: EventDetailProps) => <Layout colorScheme="auto">
    <EventDetail {...args} />
</Layout>

export const ProcedureGroup = {
    args: {
        previewState: "ProcedureGroup"
    },
    render: render
};

export const Report = {
    args: {
        previewState: "Report"
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

