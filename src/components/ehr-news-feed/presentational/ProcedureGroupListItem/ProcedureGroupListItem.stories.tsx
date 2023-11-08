import React from "react";
import { Card, Layout } from "../../../presentational";
import ProcedureGroupListItem, { ProcedureGroupListItemProps } from "./ProcedureGroupListItem";

export default { title: "EhrNewsFeed/Presentational/ProcedureGroupListItem", component: ProcedureGroupListItem, parameters: { layout: 'fullscreen' } };
let render = (args: ProcedureGroupListItemProps) => <Layout colorScheme="auto">
    <Card><ProcedureGroupListItem {...args} /></Card>
</Layout>

let props: ProcedureGroupListItemProps = {
    event:         {
        "Type": "ProcedureGroup",
        "Category": "Procedure",
        "ID": "fe14a3dc-2efe-ed11-aac9-0afb9334277d",
        "Date": "2017-11-05T16:00:00+00:00",
        "Event": [
            {
                "ID": "fe14a3dc-2efe-ed11-aac9-0afb9334277d",
                "Date": "2017-11-05T16:00:00+00:00",
                "Procedure": "INJ TENDON SHEATH/LIGAMENT",
                "Type": "",
                "Description": "SOFT TISSUE",
                "Location": "",
            },
            {
                "ID": "fc14a3dc-2efe-ed11-aac9-0afb9334277d",
                "Date": "2017-11-05T16:00:00+00:00",
                "Procedure": "ARTHROCENTESIS - JOINT INJECTION",
                "Type": "",
                "Description": "ARTHROCENTESIS - JOINT INJECTION",
                "Location": "",
            },
            {
                "ID": "fc14a3dc-2efe-ed11-aac9-0afb9334277d",
                "Date": "2017-11-05T16:00:00+00:00",
                "Procedure": "ARTHROCENTESIS - JOINT INJECTION",
                "Type": "",
                "Description": "ARTHROCENTESIS - JOINT INJECTION",
                "Location": "",
            }
        ],
        "Patient": {
            "PatientID": "ac81d336-72d8-407d-8731-b74aa8a7b42b",
            "PersonID": "d1c2475f-3177-4581-8d8c-6cdc45d89bc4",
            "PatientName": "D D",
            "RecordAuthority": "Cedars-Sinai"
        }
    }
}

export const Default = {
    args: props,
    render: render
};


export const ShowIcon = {
    args: {...props, showIcon: true},
    render: render
};