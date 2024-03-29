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
};

export const SingleLabs = Template.bind({});
SingleLabs.args = {
    previewState: "SingleLabs",
    showDetailedResults: true,
};

export const ManyLabs = Template.bind({});
ManyLabs.args = {
    previewState: "ManyLabs",
    showDetailedResults: true,
    maximumResults: 5,
};

export const NoData = Template.bind({});
NoData.args = {
    previewState: "NoData"
};

export const Live = Template.bind({});
Live.args = {};