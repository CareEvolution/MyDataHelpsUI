import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import LabResultsBloodType, { LabResultsBloodTypeProps } from "./LabResultsBloodType"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/LabResultsBloodType",
    component: LabResultsBloodType,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof LabResultsBloodType>;

const Template: ComponentStory<typeof LabResultsBloodType> = (args: LabResultsBloodTypeProps) =>
    <Layout colorScheme="auto">
        <LabResultsBloodType {...args} />
    </Layout>;


export const BloodTypeLabs = Template.bind({});
BloodTypeLabs.args = {
    previewState: "BloodTypeLabs",
    summaryResultsOnly: true,
    externalInfoLink: true,
    externalInfoLinkDefault: "https://medlineplus.gov/blood.html",
    externalInfoLinkSpanish: "https://medlineplus.gov/spanish/blood.html"
};

export const SingleLabs = Template.bind({});
SingleLabs.args = {
    previewState: "SingleLabs",
    summaryResultsOnly: false,
    maximumResults: 5,
    externalInfoLink: false,
};

export const ManyLabs = Template.bind({});
ManyLabs.args = {
    previewState: "ManyLabs",
    summaryResultsOnly: false,
    maximumResults: 5,
    externalInfoLink: false
};

export const NoData = Template.bind({});
NoData.args = {
    previewState: "NoData"
};

export const Live = Template.bind({});
Live.args = {};