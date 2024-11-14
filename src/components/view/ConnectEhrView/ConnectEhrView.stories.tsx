import React from "react"
import ConnectEhrView, {ConnectEhrViewProps} from "./ConnectEhrView"
import { Card, Layout } from "../../presentational"
import { Meta, StoryObj } from "@storybook/react/*"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof ConnectEhrView> = {
    title: "View/ConnectEhrView",
    component: ConnectEhrView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof ConnectEhrView>;

const render = (args: ConnectEhrViewProps) => <Layout colorScheme='auto'>
    <Card>
        <ConnectEhrView {...args} />
    </Card>
</Layout>;

export const Default : Story = {
    args: {
        preview: true,
        externalAccountsApplicationUrl: "preview",
        presentation: "Push" 
    },
    render: render
};

export const ProvidersOnly : Story = {
    args: {
        preview: true,
        externalAccountsApplicationUrl: "preview",
        presentation: "Push",
        excludeHealthPlans: true
    },
    render: render
};

export const HealthPlansOnly : Story = {
    args: {
        preview: true,
        externalAccountsApplicationUrl: "preview",
        presentation: "Push",
        excludeProviders: true
    },
    render: render
};

export const Live : Story = {
    args: {
        preview: false,
        externalAccountsApplicationUrl: "preview",
        presentation: "Push"
    },
    render: render
};