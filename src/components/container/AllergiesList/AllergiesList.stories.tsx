import React from "react";
import { Card, Layout } from "../../presentational";
import AllergiesList, { AllergiesListProps } from "./AllergiesList";
import { TermInformation } from "../../presentational/LabResultWithSparkline/LabResultWithSparkline";

export default { title: "Container/AllergiesList", component: AllergiesList, parameters: { layout: 'fullscreen' } };
let render = (args: AllergiesListProps) => <Layout colorScheme="auto"><Card><AllergiesList {...args} /></Card></Layout>

export const Default = {
    args: {
        previewState: "default",
        onViewTermInfo: (termInfo: TermInformation) => {
            console.log(termInfo);
        }
    },
    render: render
};

export const Live = {
    args: {
        onViewTermInfo: (termInfo: TermInformation) => {
            console.log(termInfo);
        }
    },
    render: render
};