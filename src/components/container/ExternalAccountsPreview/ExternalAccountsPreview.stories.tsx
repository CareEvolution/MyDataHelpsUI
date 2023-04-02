import React from "react"
import {ComponentMeta, ComponentStory} from "@storybook/react"
import ExternalAccountsPreview, {ExternalAccountsPreviewProps} from "./ExternalAccountsPreview"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/ExternalAccountsPreview",
    component: ExternalAccountsPreview,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ExternalAccountsPreview>;

const Template: ComponentStory<typeof ExternalAccountsPreview> = (args: ExternalAccountsPreviewProps) =>
    <Layout autoDarkMode>
        <ExternalAccountsPreview {...args} />
    </Layout>;

export const Default = Template.bind({});
Default.args = {
    previewState: "Default",
    applicationUrl: "preview"
};

export const ProvidersOnly = Template.bind({});
ProvidersOnly.args = {
    previewState: "Default",
    applicationUrl: "preview",
    excludeHealthPlans: true,
    excludeDeviceManufacturers: true
};

export const HealthPlansOnly = Template.bind({});
HealthPlansOnly.args = {
    previewState: "Default",
    applicationUrl: "preview",
    excludeProviders: true,
    excludeDeviceManufacturers: true
};

export const DeviceManufacturersOnly = Template.bind({});
DeviceManufacturersOnly.args = {
    previewState: "Default",
    applicationUrl: "preview",
    excludeProviders: true,
    excludeHealthPlans: true
};

export const ProvidersAndHealthPlans = Template.bind({});
ProvidersAndHealthPlans.args = {
    previewState: "Default",
    applicationUrl: "preview",
    excludeDeviceManufacturers: true
};

export const ProvidersAndDeviceManufacturers = Template.bind({});
ProvidersAndDeviceManufacturers.args = {
    previewState: "Default",
    applicationUrl: "preview",
    excludeHealthPlans: true
};

export const HealthPlansAndDeviceManufacturers = Template.bind({});
HealthPlansAndDeviceManufacturers.args = {
    previewState: "Default",
    applicationUrl: "preview",
    excludeProviders: true
};