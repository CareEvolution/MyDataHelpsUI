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

export const Preview = Template.bind({});
Preview.args = {preview: true, externalAccountsApplicationUrl: "preview", presentation: "Push"};

export const Live = Template.bind({});
Live.args = {preview: false, externalAccountsApplicationUrl: "preview", presentation: "Push"};