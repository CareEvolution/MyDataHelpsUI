import React from "react";
import Layout from "../Layout"
import RotatingText, { RotatingTextProps } from "./RotatingText"
import { add } from "date-fns";

export default {
    title: "Presentational/RotatingText",
    component: RotatingText,
    parameters: {layout: 'fullscreen'}
};

let render = (args: RotatingTextProps) => <Layout><RotatingText {...args} /></Layout>

let now = new Date();

export const Day1 = {
    args: {
        interval: 'day',
        entryTitlePrefix: 'Daily Text #',
        entries: [
            {title: '001', text: 'Here is the first daily text.'},
            {title: '002', text: 'Here is the second daily text.'}
        ],
        startDate: now
    },
    render: render
};

export const Day2 = {
    args: {
        interval: 'day',
        entryTitlePrefix: 'Daily Text #',
        entries: [
            {title: '001', text: 'Here is the first daily text.'},
            {title: '002', text: 'Here is the second daily text.'}
        ],
        startDate: add(new Date(now), {days: -1})
    },
    render: render
};

export const Day3 = {
    args: {
        interval: 'day',
        entryTitlePrefix: 'Daily Text #',
        entries: [
            {title: '001', text: 'Here is the first daily text.'},
            {title: '002', text: 'Here is the second daily text.'}
        ],
        startDate: add(new Date(now), {days: -2})
    },
    render: render
};

export const Week1 = {
    args: {
        interval: 'week',
        entryTitlePrefix: 'Weekly Text #',
        entries: [
            {title: '001', text: 'Here is the first weekly text.'},
            {title: '002', text: 'Here is the second weekly text.'}
        ],
        startDate: now
    },
    render: render
};

export const Week2 = {
    args: {
        interval: 'week',
        entryTitlePrefix: 'Weekly Text #',
        entries: [
            {title: '001', text: 'Here is the first weekly text.'},
            {title: '002', text: 'Here is the second weekly text.'}
        ],
        startDate: add(new Date(now), {weeks: -1})
    },
    render: render
};

export const Week3 = {
    args: {
        interval: 'week',
        entryTitlePrefix: 'Weekly Text #',
        entries: [
            {title: '001', text: 'Here is the first weekly text.'},
            {title: '002', text: 'Here is the second weekly text.'}
        ],
        startDate: add(new Date(now), {weeks: -2})
    },
    render: render
};

export const Month1 = {
    args: {
        interval: 'month',
        entryTitlePrefix: 'Monthly Text #',
        entries: [
            {title: '001', text: 'Here is the first monthly text.'},
            {title: '002', text: 'Here is the second monthly text.'}
        ],
        startDate: now
    },
    render: render
};

export const Month2 = {
    args: {
        interval: 'month',
        entryTitlePrefix: 'Monthly Text #',
        entries: [
            {title: '001', text: 'Here is the first monthly text.'},
            {title: '002', text: 'Here is the second monthly text.'}
        ],
        startDate: add(new Date(now), {months: -1})
    },
    render: render
};

export const Month3 = {
    args: {
        interval: 'month',
        entryTitlePrefix: 'Monthly Text #',
        entries: [
            {title: '001', text: 'Here is the first monthly text.'},
            {title: '002', text: 'Here is the second monthly text.'}
        ],
        startDate: add(new Date(now), {months: -2})
    },
    render: render
};

export const NoTitlePrefix = {
    args: {
        interval: 'day',
        entries: [
            {title: 'Some Title', text: 'Here is the daily text.'}
        ],
        startDate: now
    },
    render: render
};

export const NoTitle = {
    args: {
        interval: 'day',
        entryTitlePrefix: 'Daily Fact',
        entries: [
            {text: 'Here is the daily text.'}
        ],
        startDate: now
    },
    render: render
};

export const NoEntries = {
    args: {
        interval: 'day',
        entryTitlePrefix: 'Daily Fact',
        entries: [],
        startDate: now
    },
    render: render
};
