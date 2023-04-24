import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Layout from "../Layout";
import { LayoutProps } from "./Layout";
import TextBlock from "../TextBlock";
import Card from "../Card";

export default {
    title: "Presentational/Layout",
    component: Layout,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args: LayoutProps) => <Layout {...args}>
    <TextBlock>Layouts</TextBlock>
    <Card>
        <TextBlock>The layout component should be used as a wrapper around your
            MyDataHelps view. It will set some global styles and provide some theming
            capabilities.  You may control the color scheme by passing in the
            colorScheme prop.  
        </TextBlock>
    </Card>
</Layout>;

export const AutoColorScheme = Template.bind({});
AutoColorScheme.args = {
    colorScheme: "auto"
}

export const LightColorScheme = Template.bind({});
LightColorScheme.args = {
    colorScheme: "light"
}

export const DarkColorScheme = Template.bind({});
DarkColorScheme.args = {
    colorScheme: "dark"
}

export const NoGlobalStyles = Template.bind({});
NoGlobalStyles.args = {
    noGlobalStyles: true
}

export const CustomBackground = Template.bind({});
CustomBackground.args = {
    colorScheme: "dark",
    bodyBackgroundColor: "#23395d",
}