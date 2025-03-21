import React from "react"
import LabResultsBloodType, { LabResultsBloodTypeProps } from "./LabResultsBloodType"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LabResultsBloodType> = {
	title: "Container/LabResultsBloodType",
	component: LabResultsBloodType,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof LabResultsBloodType>;

const render = (args: LabResultsBloodTypeProps) =>
	<Layout colorScheme="auto">
        <LabResultsBloodType {...args} />
    </Layout>;

export const BloodTypeLabs: Story = {
    args: {
        previewState: "BloodTypeLabs"
    },
    render: render
}

export const SingleLabs: Story = {
    args: {
        previewState: "SingleLabs",
        showDetailedResults: true
    },
    render: render
}

export const ManyLabs: Story = {
    args: {
        previewState: "ManyLabs",
        showDetailedResults: true,
        maximumResults: 5
    },
    render: render
}

export const NoData: Story = {
    args: {
        previewState: "NoData",
    },
    render: render
}

export const Live: Story = {
    args: {},
    render: render
}