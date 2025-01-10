import React from "react";
import Layout from "../Layout";
import { LayoutProps } from "./Layout";
import TextBlock from "../TextBlock";
import Card from "../Card";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof Layout> = {
    title: "Presentational/Layout",
    component: Layout,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof Layout>;

const render = (args: LayoutProps) => <Layout {...args}>
    <TextBlock>Layouts</TextBlock>
    <Card>
        <TextBlock>The layout component should be used as a wrapper around your
            MyDataHelps view. It will set some global styles and provide some theming
            capabilities.  You may control the color scheme by passing in the
            colorScheme prop.
        </TextBlock>
    </Card>
</Layout>;

export const AutoColorScheme: Story = {
    args: {
        colorScheme: "auto"
    },
    render: render
};

export const LightColorScheme: Story = {
    args: {
        colorScheme: "light"
    },
    render: render
};

export const DarkColorScheme: Story = {
    args: {
        colorScheme: "dark"
    },
    render: render
};

export const NoGlobalStyles: Story = {
    args: {
        noGlobalStyles: true
    },
    render: render
};

export const CustomBackground: Story = {
    args: {
        colorScheme: "dark",
        bodyBackgroundColor: "#23395d",
    },
    render: render
};

export const CustomBackgroundLightDark: Story = {
    args: {
        colorScheme: "auto",
        bodyBackgroundColor: { darkMode: "#23395d", lightMode: "#ffffff" }
    },
    render: render
};