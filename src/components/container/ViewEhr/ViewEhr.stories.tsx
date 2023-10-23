import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import ViewEhr, { ViewEhrProps } from "./ViewEhr";

export default {
    title: "Container/ViewEhr",
    component: ViewEhr,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: ViewEhrProps) => <Layout colorScheme="auto"><Card><ViewEhr {...args} /></Card></Layout>

export const Default = {
    args: {
        previewState: "default"
    },
    render: render
};