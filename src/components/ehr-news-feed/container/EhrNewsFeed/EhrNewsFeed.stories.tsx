import React from "react";
import { Layout } from "../../../presentational";
import EhrNewsFeed, { EhrNewsFeedProps } from "./EhrNewsFeed";

export default { title: "EhrNewsFeed/Container/EhrNewsFeed", component: EhrNewsFeed, parameters: { layout: 'fullscreen' } };
let render = (args: EhrNewsFeedProps) => <Layout colorScheme="auto">
    <EhrNewsFeed {...args} />
</Layout>

export const Procedures = {
    args: {
        feed: "Procedures"
    },
    render: render
};


export const Immunizations = {
    args: {
        feed: "Immunizations"
    },
    render: render
};