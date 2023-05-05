import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import LabResultsSummary, { LabResultsSummaryProps } from "./LabResultsSummary"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/LabResultsSummary",
    component: LabResultsSummary,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof LabResultsSummary>;

const Template: ComponentStory<typeof LabResultsSummary> = (args: LabResultsSummaryProps) =>
    <Layout colorScheme="auto">
        <LabResultsSummary {...args} />
    </Layout>;


export const ImportantLabs = Template.bind({});
ImportantLabs.args = {
    previewState: "ImportantLabs"
};

export const RecentLabs = Template.bind({});
RecentLabs.args = {
    previewState: "RecentLabs"
};

export const NoData = Template.bind({});
NoData.args = {
    previewState: "NoData"
};

export const Live = Template.bind({});
Live.args = {};