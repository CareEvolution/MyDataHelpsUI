import React from "react"
import {ComponentMeta, ComponentStory} from "@storybook/react"
import ExternalAccountStatus, {ExternalAccountStatusProps} from "./ExternalAccountStatus"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/ExternalAccountStatus",
    component: ExternalAccountStatus,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ExternalAccountStatus>;

const Template: ComponentStory<typeof ExternalAccountStatus> = (args: ExternalAccountStatusProps) =>
    <Layout colorScheme="auto">
        <ExternalAccountStatus {...args} />
    </Layout>;

export const ExternalAccountsFetchingData = Template.bind({});
ExternalAccountsFetchingData.args = {
    previewState: "externalAccountsFetchingData"
};

export const ExternalAccountsRequireAttention = Template.bind({});
ExternalAccountsRequireAttention.args = {
    previewState: "externalAccountsRequireAttention"
};

export const ExternalAccountsFetchComplete = Template.bind({});
ExternalAccountsFetchComplete.args = {
    previewState: "externalAccountsLoaded"
};

export const Live = Template.bind({});
Live.args = {};