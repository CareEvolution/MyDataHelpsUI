import React from "react";
import Layout from "../Layout"
import RotatingText, { RotatingTextEntry, RotatingTextProps } from "./RotatingText"
import Card from "../Card";

export default {
    title: "Presentational/RotatingText",
    component: RotatingText,
    parameters: {layout: 'fullscreen'}
};

const now = new Date();
const entries: RotatingTextEntry[] = [
    {title: 'Title 1', text: 'Here is the first text.'},
    {title: 'Title 2', text: 'Here is the second text.'},
    {title: 'Title 3', text: 'Here is the third text.'},
    {title: 'Title 4', text: 'Here is the fourth text.'},
    {title: 'Title 5', text: 'Here is the fifth text.'}
];

let render = (args: RotatingTextProps) => <Layout>
    <Card>
        <RotatingText {...args} entries={entries}/>
    </Card>
</Layout>;

export const Default = {
    args: {
        interval: 'day',
        entryTitlePrefix: 'Title Prefix - ',
        startDate: now
    },
    argTypes: {
        interval: {
            control: 'radio',
            options: ['day', 'week', 'month']
        },
        entryTitlePrefix: {
            name: 'title prefix'
        },
        startDate: {
            control: 'date'
        }
    },
    render: render
};