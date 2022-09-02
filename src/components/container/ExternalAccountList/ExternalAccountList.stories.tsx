import React from "react"
import {ComponentMeta, ComponentStory} from "@storybook/react"
import ExternalAccountList, {ExternalAccountListProps} from "./ExternalAccountList"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/ExternalAccountList",
    component: ExternalAccountList,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ExternalAccountList>;

const Template: ComponentStory<typeof ExternalAccountList> = (args: ExternalAccountListProps) =>
    <Layout>
        <ExternalAccountList {...args} />
    </Layout>;

export const Default = Template.bind({});
Default.args = {
    previewState: "Default",
    externalAccountProviderCategories: ["Provider", "Health Plan"]
};