import React from "react";
import ContrastChart, { ContrastChartProps } from "./ContrastChart";
import { Card, Layout } from "..";

export default {
    title: "Presentational/ContrastChart",
    component: ContrastChart,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: ContrastChartProps) => <Layout colorScheme="auto">
    <Card style={{ padding: "16px" }}><ContrastChart {...args} /></Card>
</Layout>;

const groups = [
    {
        label: "Above 7h 30m",
        average: 9400,
        formattedAverage: "9,400",
        values: [8200, 9100, 10500, 9800, 8700, 11200, 9400, 8900, 10100, 9600, 8500, 10800, 9200],
        color: "var(--mdhui-color-primary)"
    },
    {
        label: "Below 7h 30m",
        average: 7500,
        formattedAverage: "7,500",
        values: [6800, 7900, 7200, 8100, 6500, 7700, 7400, 8300, 6900, 7600, 7100],
        color: "var(--mdhui-border-color-2)"
    }
];

export const Bars = {
    args: {
        variant: "bars",
        groups: groups
    },
    render: render
};

export const DotColumns = {
    args: {
        variant: "dotColumns",
        groups: groups
    },
    render: render
};
