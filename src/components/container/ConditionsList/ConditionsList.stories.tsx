import React from "react";
import { Card, Layout } from "../../presentational";
import ConditionsList, { ConditionsListProps } from "./ConditionsList";
import { TermInformationReference } from "../TermInformation/TermInformation";

export default { title: "Container/ConditionsList", component: ConditionsList, parameters: { layout: 'fullscreen' } };
let render = (args: ConditionsListProps) => <Layout colorScheme="auto"><Card><ConditionsList {...args} /></Card></Layout>

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