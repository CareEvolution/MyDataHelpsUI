import React from "react";
import TermInformation, { TermInformationProps } from "./TermInformation";
import { Layout } from "../../presentational";

export default { title: "Container/TermInformation", component: TermInformation, parameters: { layout: 'fullscreen' } };
let render = (args: TermInformationProps) => <Layout colorScheme="auto"> <TermInformation {...args} /></Layout>
export const Default = {
    args: { previewState: "default", openLinksInNewWindow: true },
    render: render
};

export const NoData = {
    args: { previewState: "noData" },
    render: render
};

export const Live = {
    args: {},
    render: render
};