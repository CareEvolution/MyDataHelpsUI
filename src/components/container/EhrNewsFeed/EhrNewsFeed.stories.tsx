import React from "react";
import { Layout } from "../../presentational";
import EhrNewsFeed, { EhrNewsFeedProps } from "./EhrNewsFeed";

export default { title: "Container/EhrNewsFeed", component: EhrNewsFeed, parameters: { layout: 'fullscreen' } };
let render = (args: EhrNewsFeedProps) => <Layout colorScheme="auto">
    <EhrNewsFeed {...args} />
</Layout>

export const Procedures = {
    args: {
        previewState: "default",
        feed: "Procedures"
    },
    render: render
};

export const Immunizations = {
    args: {
        previewState: "default",
        feed: "Immunizations"
    },
    render: render
};

export const LabReports = {
    args: {
        previewState: "default",
        feed: "LabReports"
    },
    render: render
};

export const Reports = {
    args: {
        previewState: "default",
        feed: "Reports"
    },
    render: render
};

export const LiveProcedures = {
    args: {
        feed: "Procedures"
    },
    render: render
};

export const LiveImmunizations = {
    args: {
        feed: "Immunizations"
    },
    render: render
};

export const LiveReports = {
    args: {
        feed: "Reports"
    },
    render: render
};

export const LiveLabReports = {
    args: {
        feed: "LabReports"
    },
    render: render
};
