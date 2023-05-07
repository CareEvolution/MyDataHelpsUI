import React from "react"
import {ComponentMeta, ComponentStory} from "@storybook/react"
import ExternalAccountsLoadingIndicator, {ExternalAccountsLoadingIndicatorProps} from "./ExternalAccountsLoadingIndicator"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/ExternalAccountsLoadingIndicator",
    component: ExternalAccountsLoadingIndicator,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ExternalAccountsLoadingIndicator>;

const Template: ComponentStory<typeof ExternalAccountsLoadingIndicator> = (args: ExternalAccountsLoadingIndicatorProps) =>
    <Layout colorScheme="auto">
        <ExternalAccountsLoadingIndicator {...args} />
    </Layout>;

export const ExternalAccountsFetchingData = Template.bind({});
ExternalAccountsFetchingData.args = {
    previewState: "externalAccountsFetchingData"
};

export const ExternalAccountsFetchComplete = Template.bind({});
ExternalAccountsFetchComplete.args = {
    previewState: "externalAccountsLoaded"
};

export const Live = Template.bind({});
Live.args = {};