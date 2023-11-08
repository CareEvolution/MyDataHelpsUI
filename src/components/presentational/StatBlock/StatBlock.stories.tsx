import React from 'react';
import { Card, Layout } from '../../presentational';
import StatBlock, { StatBlockProps } from './StatBlock';

export default {
    title: 'Presentational/StatBlock',
    component: StatBlock,
    parameters: { layout: 'fullscreen' }
};

const render = (args: StatBlockProps) => <Layout colorScheme="auto"><Card><StatBlock {...args} /></Card></Layout>

const children = <div className="progress-ring-story">Great Job!</div>;

export const Default = {
    args: {
        stats: [
            {
                label: "Type",
                value: "Something"
            },
            {
                label: "Location",
                value: <div style={{color:"red"}}>Hospital A</div>
            },
            {
                label: "Description",
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
            },
            {
                label: "Performed by",
                value: "John Doe"
            },
            {
                label: "Verified by",
                value: "Jane Doe"
            }
        ],
        defaultMargin: true
    },
    render: render
};