import React from "react";
import { Card, Layout } from "../../../presentational";
import NewsFeedListItem, { NewsFeedListItemProps } from "./NewsFeedListItem";
import { claimProcedureGroupEvent, claimServiceGroupEvent, labReportEvent, procedureGroupEvent, reportEvent } from "../../helpers/previewData";

export default { title: "EhrNewsFeed/Presentational/NewsFeedListItem", component: NewsFeedListItem, parameters: { layout: 'fullscreen' } };
let render = (args: NewsFeedListItemProps) => <Layout colorScheme="auto">
    <Card><NewsFeedListItem {...args} /></Card>
</Layout>

export const ProcedureGroup = {
    args: {
        event: procedureGroupEvent,
        onClick: (event: any) => {
            console.log(event);
        }
    },
    render: render
};


export const Report = {
    args: {
        event: reportEvent,
        onClick: (event: any) => {
            console.log(event);
        }
    },
    render: render
};


export const LabReport = {
    args: {
        event: labReportEvent,
        onClick: (event: any) => {
            console.log(event);
        }
    },
    render: render
};


export const ClaimServiceGroup = {
    args: {
        event: claimServiceGroupEvent,
        onClick: (event: any) => {
            console.log(event);
        }
    },
    render: render
};

export const ClaimProcedureGroup = {
    args: {
        event: claimProcedureGroupEvent,
        onClick: (event: any) => {
            console.log(event);
        }
    },
    render: render
};