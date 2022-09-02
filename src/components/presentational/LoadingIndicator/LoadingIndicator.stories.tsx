import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Layout from "../Layout"
import LoadingIndicator from "./LoadingIndicator";

export default {
    title: "Presentational/LoadingIndicator",
    component: LoadingIndicator,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof LoadingIndicator>;

const Template: ComponentStory<typeof LoadingIndicator> = () => <Layout> <LoadingIndicator/> </Layout>;

export const Default = Template.bind({});