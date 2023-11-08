import React from "react";
import { Card, Layout } from "../../../presentational";
import EhrNewsFeed, { EhrNewsFeedProps } from "./EhrNewsFeed";

export default { title: "EhrNewsFeed/Container/EhrNewsFeed", component: EhrNewsFeed, parameters: { layout: 'fullscreen' } };
let render = (args: EhrNewsFeedProps) => <Layout colorScheme="auto">
    <EhrNewsFeed {...args} />
</Layout>

let props: EhrNewsFeedProps = {
    feed: "Procedures"
}

export const Default = {
    args: props,
    render: render
};