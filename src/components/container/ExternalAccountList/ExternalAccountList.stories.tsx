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
    <Layout  colorScheme="auto">
        <ExternalAccountList {...args} />
    </Layout>;

export const Default = Template.bind({});
Default.args = {
    previewState: "Default",
    externalAccountProviderCategories: ["Provider", "Health Plan", "Device Manufacturer"]
};

export const ProvidersOnly = Template.bind({});
ProvidersOnly.args = {
    previewState: "Default",
    externalAccountProviderCategories: ["Provider"]
};

export const HealthPlansOnly = Template.bind({});
HealthPlansOnly.args = {
    previewState: "Default",
    externalAccountProviderCategories: ["Health Plan"]
};

export const DeviceManufacturersOnly = Template.bind({});
DeviceManufacturersOnly.args = {
    previewState: "Default",
    externalAccountProviderCategories: ["Device Manufacturer"]
};

export const ProvidersAndHealthPlans = Template.bind({});
ProvidersAndHealthPlans.args = {
    previewState: "Default",
    externalAccountProviderCategories: ["Provider", "Health Plan"]
};

export const ProvidersAndDeviceManufacturers = Template.bind({});
ProvidersAndDeviceManufacturers.args = {
    previewState: "Default",
    externalAccountProviderCategories: ["Provider", "Device Manufacturer"]
};

export const HealthPlansAndDeviceManufacturers = Template.bind({});
HealthPlansAndDeviceManufacturers.args = {
    previewState: "Default",
    externalAccountProviderCategories: ["Health Plan", "Device Manufacturer"]
};