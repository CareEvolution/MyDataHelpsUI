import React from "react";
import { Layout } from "../../../presentational";
import EhrNewsFeed, { EhrNewsFeedProps } from "./EhrNewsFeed";

export default { title: "EhrNewsFeed/Container/EhrNewsFeed", component: EhrNewsFeed, parameters: { layout: 'fullscreen' } };
let render = (args: EhrNewsFeedProps) => <Layout colorScheme="auto">
    <EhrNewsFeed {...args} />
</Layout>

export const Default = {
    args: {
        previewState: "default",
        feed: "Something"
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
