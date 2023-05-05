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

export const Default = Template.bind({});
Default.args = {
    previewState: "default"
};

export const Loading = Template.bind({});
Loading.args = {
    previewState: "loading"
};

export const NoData = Template.bind({});
NoData.args = {
    previewState: "noData"
};