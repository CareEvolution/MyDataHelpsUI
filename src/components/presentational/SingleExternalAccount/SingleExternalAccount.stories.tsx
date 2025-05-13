import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SingleExternalAccount, { SingleExternalAccountProps } from "./SingleExternalAccount";
import Layout from "../Layout"
import { add } from "date-fns";
import { ExternalAccount } from "@careevolution/mydatahelps-js";

const meta: Meta<typeof SingleExternalAccount> = {
    title: "Presentational/SingleExternalAccount",
    component: SingleExternalAccount,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof SingleExternalAccount>;

const render = (args: SingleExternalAccountProps) => <Layout colorScheme="auto"><SingleExternalAccount {...args} /></Layout>;

const externalAccount: ExternalAccount = {
    id: 1,
    lastRefreshDate: add(new Date(), { days: -1 }).toISOString(),
    status: "fetchComplete",
    provider:
    {
        "id": 37,
        "name": "Cedars-Sinai Health System",
        "category": "Provider",
        "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo",
        "enabled": true
    }
};

export const FetchComplete: Story = {
    args: {
        externalAccount: { ...externalAccount }
    },
    render: render
};


export const FetchingData: Story = {
    args: {
        externalAccount: { ...externalAccount, status: "fetchingData" }
    },
    render: render
};

export const Unauthorized: Story = {
    args: {
        externalAccount: { ...externalAccount, status: "unauthorized" }
    },
    render: render
};

export const WithError: Story = {
    args: {
        externalAccount: { ...externalAccount, status: "error" }
    },
    render: render
};