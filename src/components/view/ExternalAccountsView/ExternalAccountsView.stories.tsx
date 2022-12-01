import React from "react"
import {ComponentMeta, ComponentStory} from "@storybook/react"
import ExternalAccountsView, {ExternalAccountsViewProps} from "./ExternalAccountsView";

export default {
    title: "View/ExternalAccountsView",
    component: ExternalAccountsView,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ExternalAccountsView>;

const Template: ComponentStory<typeof ExternalAccountsView> = (args: ExternalAccountsViewProps) => <ExternalAccountsView {...args} />;

export const Default = Template.bind({});
Default.args = {
    preview: true,
    presentation: "Push"
};

export const ProvidersOnly = Template.bind({});
ProvidersOnly.args = {
    preview: true,
    presentation: "Push",
    excludeHealthPlans: true,
    excludeDeviceManufacturers: true
};

export const HealthPlansOnly = Template.bind({});
HealthPlansOnly.args = {
    preview: true,
    presentation: "Push",
    excludeProviders: true,
    excludeDeviceManufacturers: true
};

export const DeviceManufacturersOnly = Template.bind({});
DeviceManufacturersOnly.args = {
    preview: true,
    presentation: "Push",
    excludeProviders: true,
    excludeHealthPlans: true
};

export const ProvidersAndHealthPlans = Template.bind({});
ProvidersAndHealthPlans.args = {
    preview: true,
    presentation: "Push",
    excludeDeviceManufacturers: true
};

export const ProvidersAndDeviceManufacturers = Template.bind({});
ProvidersAndDeviceManufacturers.args = {
    preview: true,
    presentation: "Push",
    excludeHealthPlans: true
};

export const HealthPlansAndDeviceManufacturers = Template.bind({});
HealthPlansAndDeviceManufacturers.args = {
    preview: true,
    presentation: "Push",
    excludeProviders: true
};

export const Live = Template.bind({});
Live.args = {
    preview: false,
    presentation: "Push"
};