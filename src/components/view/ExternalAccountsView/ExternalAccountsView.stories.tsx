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

export const Preview = Template.bind({});
Preview.args = {preview: true, excludeDeviceManufacturers: false, presentation: "Push"};

export const Live = Template.bind({});
Live.args = {preview: false, excludeDeviceManufacturers: false, presentation: "Push"};