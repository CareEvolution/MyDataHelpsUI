import React from "react";
import { Card, Layout } from "../../../presentational";
import ProcedureGroupDetail, { ProcedureGroupDetailProps } from "./ProcedureGroupDetail";

export default { title: "EhrNewsFeed/Presentational/ProcedureGroupDetail", component: ProcedureGroupDetail, parameters: { layout: 'fullscreen' } };
let render = (args: ProcedureGroupDetailProps) => <Layout colorScheme="auto">
    <ProcedureGroupDetail {...args} />
</Layout>

let props: ProcedureGroupDetailProps = {
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
                "Type": "Surgery",
                "Description": "SOFT TISSUE",
                "Location": "Hospital A",
                PerformedByCaregiver: {
                    ID: "123",
                    CaregiverName: "John Doe",
                    Addresses: [],
                    ContactInfos: [],
                    Pcp: false
                },
                VerifiedByCaregiver: {
                    ID: "123",
                    CaregiverName: "John Doe",
                    Addresses: [],
                    ContactInfos: [],
                    Pcp: false
                }
            },
            {
                "ID": "fc14a3dc-2efe-ed11-aac9-0afb9334277d",
                "Date": "2017-11-05T16:00:00+00:00",
                "Procedure": "ARTHROCENTESIS - JOINT INJECTION",
                "Type": "",
                "Description": "ARTHROCENTESIS - JOINT INJECTION",
                "Location": "Hospital B",
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