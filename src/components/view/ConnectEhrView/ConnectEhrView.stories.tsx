import React from "react"
import {ComponentMeta, ComponentStory} from "@storybook/react"
import ConnectEhrView, {ConnectEhrViewProps} from "./ConnectEhrView"

export default {
    title: "View/ConnectEhrView",
    component: ConnectEhrView,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ConnectEhrView>;

const Template: ComponentStory<typeof ConnectEhrView> = (args: ConnectEhrViewProps) => <ConnectEhrView {...args} />;

export const Default = Template.bind({});
Default.args = {
    preview: true,
    externalAccountsApplicationUrl: "preview",
    presentation: "Push"
};

export const ProvidersOnly = Template.bind({});
ProvidersOnly.args = {
    preview: true,
    externalAccountsApplicationUrl: "preview",
    presentation: "Push",
    excludeHealthPlans: true
};

export const HealthPlansOnly = Template.bind({});
HealthPlansOnly.args = {
    preview: true,
    externalAccountsApplicationUrl: "preview",
    presentation: "Push",
    excludeProviders: true
};

export const Live = Template.bind({});
Live.args = {
    preview: false,
    externalAccountsApplicationUrl: "preview",
    presentation: "Push"
};