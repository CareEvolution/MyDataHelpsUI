import React from "react"
import {ComponentMeta, ComponentStory} from "@storybook/react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import ConnectEhr, {ConnectEhrProps} from "./ConnectEhr";

export default {
    title: "Container/ConnectEhr",
    component: ConnectEhr,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ConnectEhr>;

const Template: ComponentStory<typeof ConnectEhr> = (args: ConnectEhrProps) =>
    <Layout colorScheme="auto">
        <Card>
            <ConnectEhr {...args} />
        </Card>
    </Layout>;

export const NotEnabledDefault = Template.bind({});
NotEnabledDefault.args = {previewState: "notEnabled"};

export const NotEnabledHide = Template.bind({});
NotEnabledHide.args = {previewState: "notEnabled", disabledBehavior: "hide"};

export const NotEnabledDisplayError = Template.bind({});
NotEnabledDisplayError.args = {previewState: "notEnabled", disabledBehavior: "displayError"};

export const Enabled = Template.bind({});
Enabled.args = {previewState: "enabled", applicationUrl: "preview"};

export const EnabledConnected = Template.bind({});
EnabledConnected.args = {previewState: "enabledConnected", applicationUrl: "preview"};

export const EnabledNeedsAttention = Template.bind({});
EnabledNeedsAttention.args = {previewState: "enabledNeedsAttention", applicationUrl: "preview"};

export const Live = Template.bind({});
Live.args = {disabledBehavior: "displayError", applicationUrl: "preview"};