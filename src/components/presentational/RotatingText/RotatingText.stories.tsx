import React from "react";
import Layout from "../Layout"
import RotatingText, { RotatingTextProps } from "./RotatingText"

export default {
    title: "Presentational/RotatingText",
    component: RotatingText,
    parameters: {layout: 'fullscreen'}
};

let render = (args: RotatingTextProps) => <Layout><RotatingText {...args} /></Layout>

export const Daily = {
    args: {
        interval: 'day',
        entryTitlePrefix: 'Daily Text #',
        entries: [
            {title: '001', text: 'Here is the first daily text.'},
            {title: '002', text: 'Here is the second daily text.'},
            {title: '003', text: 'Here is the third daily text.'}
        ]
    },
    render: render
};

export const Weekly = {
    args: {
        interval: 'week',
        entryTitlePrefix: 'Weekly Text #',
        entries: [
            {title: '001', text: 'Here is the first weekly text.'},
            {title: '002', text: 'Here is the second weekly text.'},
            {title: '003', text: 'Here is the third weekly text.'}
        ]
    },
    render: render
};

export const Monthly = {
    args: {
        interval: 'month',
        entryTitlePrefix: 'Monthly Text #',
        entries: [
            {title: '001', text: 'Here is the first monthly text.'},
            {title: '002', text: 'Here is the second monthly text.'},
            {title: '003', text: 'Here is the third monthly text.'}
        ]
    },
    render: render
};

export const NoTitlePrefix = {
    args: {
        interval: 'day',
        entries: [
            {title: 'Some Title', text: 'Here is the daily text.'}
        ]
    },
    render: render
};

export const NoTitle = {
    args: {
        interval: 'day',
        entryTitlePrefix: 'Daily Fact',
        entries: [
            {text: 'Here is the daily text.'}
        ]
    },
    render: render
};
