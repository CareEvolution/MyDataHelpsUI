import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Histogram, {HistogramProps} from "./Histogram";
import Layout from "../Layout";

export default {
    title: "Presentational/Histogram",
    component: Histogram,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof Histogram>;

const Template: ComponentStory<typeof Histogram> = (args: HistogramProps) => <Layout autoDarkMode><Histogram {...args} /></Layout>;

export const Default = Template.bind({});
Default.args = {
    entries: [
        {label: "Insomnia", color: "#c4291c", value: 21},
        {label: "Neck Pain", color: "#e35c33", value: 15},
        {label: "Back Pain", color: "#5db37e", value: 14},
        {label: "Headache", color: "#429bdf", value: 13},
        {label: "Fatigue", color: "#7b88c6", value: 13},
        {label: "Anxiety", color: "#616161", value: 13},
        {label: "Joint Pain", color: "#d98177", value: 11},
        {label: "Nausea", color: "#f5b722", value: 11},
        {label: "Light Sensitivity", color: "#397d49", value: 10},
        {label: "Abdominal Pain", color: "#4154af", value: 10},
        {label: "IBS", color: "#8333a4", value: 7},
        {label: "Shortness of Breath", color: "#f686ae", value: 6},
        {label: "Brain Fog", color: "#af9fd7", value: 6}
    ]
}