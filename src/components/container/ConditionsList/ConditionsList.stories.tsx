import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import ConditionsList, { ConditionsListProps } from "./ConditionsList";

export default {
    title: "Container/ConditionsList",
    component: ConditionsList,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ConditionsList>;

const Template: ComponentStory<typeof ConditionsList> = (args: ConditionsListProps) =>
    <Layout colorScheme="auto">
        <Card>
            <ConditionsList {...args} />
        </Card>
    </Layout>;

export const Default = Template.bind({});
Default.args = { previewState: "default" };

export const Live = Template.bind({});
Live.args = {};
