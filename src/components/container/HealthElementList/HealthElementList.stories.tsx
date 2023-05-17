import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import HealthElementList, { HealthElementListProps } from "./HealthElementList";

export default {
    title: "Container/HealthElementList",
    component: HealthElementList,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof HealthElementList>;

const Template: ComponentStory<typeof HealthElementList> = (args: HealthElementListProps) =>
    <Layout colorScheme="auto">
        <Card>
            <HealthElementList {...args} />
        </Card>
    </Layout>;

export const Default = Template.bind({});
Default.args = { previewState: "default" };

export const Live = Template.bind({});
Live.args = {};
