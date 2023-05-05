import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import HealthPreviewSection, { HealthPreviewSectionProps } from "./HealthPreviewSection"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/HealthPreviewSection",
    component: HealthPreviewSection,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof HealthPreviewSection>;

const Template: ComponentStory<typeof HealthPreviewSection> = (args: HealthPreviewSectionProps) =>
    <Layout colorScheme="auto">
        <HealthPreviewSection {...args} />
    </Layout>;

export const Default = Template.bind({});
Default.args = {
    concept: "Medications"
};

// export const Loading = Template.bind({});
// Loading.args = {
//     previewState: "loading"
// };

// export const NoData = Template.bind({});
// NoData.args = {
//     previewState: "noData"
// };