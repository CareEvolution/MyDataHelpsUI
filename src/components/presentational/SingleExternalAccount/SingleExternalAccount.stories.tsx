import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import SingleExternalAccount, {SingleExternalAccountProps} from "./SingleExternalAccount";
import Layout from "../Layout"
import {add} from "date-fns";

export default {
    title: "Presentational/SingleExternalAccount",
    component: SingleExternalAccount,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof SingleExternalAccount>;

const Template: ComponentStory<typeof SingleExternalAccount> = (args: SingleExternalAccountProps) => <Layout colorScheme="auto"><SingleExternalAccount {...args} /></Layout>;

export const FetchComplete = Template.bind({});
FetchComplete.args = {
    externalAccount: {
        id: 1,
        lastRefreshDate: add(new Date(), {days: -1}).toISOString(),
        status: "fetchComplete",
        provider:
            {
                "id": 37,
                "name": "Cedars-Sinai Health System",
                "category": "Provider",
                "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo"
            }
    }
}

export const FetchingData = Template.bind({});
FetchingData.args = {
    externalAccount: {
        id: 1,
        lastRefreshDate: add(new Date(), {days: -1}).toISOString(),
        status: "fetchingData",
        provider:
            {
                "id": 37,
                "name": "Cedars-Sinai Health System",
                "category": "Provider",
                "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo"
            }
    }
}

export const Unauthorized = Template.bind({});
Unauthorized.args = {
    externalAccount: {
        id: 1,
        lastRefreshDate: add(new Date(), {days: -1}).toISOString(),
        status: "unauthorized",
        provider:
            {
                "id": 37,
                "name": "Cedars-Sinai Health System",
                "category": "Provider",
                "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo"
            }
    }
}

export const Error = Template.bind({});
Error.args = {
    externalAccount: {
        id: 1,
        lastRefreshDate: add(new Date(), {days: -1}).toISOString(),
        status: "error",
        provider:
            {
                "id": 37,
                "name": "Cedars-Sinai Health System",
                "category": "Provider",
                "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo"
            }
    }
}