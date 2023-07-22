import React from "react";
import ViewHeader, { ViewHeaderProps } from "./ViewHeader";
import Layout from "../../presentational/Layout";

export default { title: "Presentational/ViewHeader", component: ViewHeader, parameters: { layout: 'fullscreen' } };
let render = (args: ViewHeaderProps) => <Layout colorScheme="auto"><ViewHeader {...args} /></Layout>
export const titleAndSubtitle = {
    name: "Title and Subtitle",
    args: { title: "Surveys", subtitle: "You've completed 12 tasks today.  Take a rest if you need to." },
    render: render
};
export const titleOnly = {
    name: "Title Only",
    args: { title: "Surveys" },
    render: render
};
export const subtitleOnly = {
    name: "Subtitle Only",
    args: { subtitle: "You've completed 12 tasks today.  Take a rest if you need to." },
    render: render
};