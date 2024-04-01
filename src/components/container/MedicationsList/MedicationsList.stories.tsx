import React from "react";
import { Card, Layout } from "../../presentational";
import MedicationsList, { MedicationsListProps } from "./MedicationsList";
import { TermInformationReference } from "../../presentational/LabResultWithSparkline/LabResultWithSparkline";

export default { title: "Container/MedicationsList", component: MedicationsList, parameters: { layout: 'fullscreen' } };
let render = (args: MedicationsListProps) => <Layout colorScheme="auto"><Card><MedicationsList {...args} /></Card></Layout>

export const Default = {
    args: {
        previewState: "default",
        onViewTermInfo: (termInfo: TermInformationReference) => {
            console.log(termInfo);
        }
    },
    render: render
};

export const Live = {
    args: {
        onViewTermInfo: (termInfo: TermInformationReference) => {
            console.log(termInfo);
        }
    },
    render: render
};