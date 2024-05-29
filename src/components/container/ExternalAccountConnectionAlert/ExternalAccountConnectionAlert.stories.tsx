import React from "react"
import Layout from "../../presentational/Layout"
import ExternalAccountConnectionAlert, { ExternalAccountConnectionAlertProps } from "./ExternalAccountConnectionAlert";
import { Section } from "../../presentational";

export default {
    title: "Container/ExternalAccountConnectionAlert",
    component: ExternalAccountConnectionAlert,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: ExternalAccountConnectionAlertProps) => <Layout colorScheme="auto"><Section><ExternalAccountConnectionAlert {...args} /></Section></Layout>

export const ExternalAccountWithIssue = {
    args: {
        previewState: "externalAccountWithIssue"
    },
    render: render
};

export const ExternalAccountNoIssue = {
    args: {
        previewState: "externalAccountNoIssue"
    },
    render: render
};