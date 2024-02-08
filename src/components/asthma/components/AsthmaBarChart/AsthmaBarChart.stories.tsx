import React from 'react';
import AsthmaBarChart, { AsthmaBarChartProps } from './AsthmaBarChart';
import { Layout, Section } from '../../../presentational';
import { randomDataProvider } from "../../../../helpers/daily-data-providers";

export default {
    title: 'Asthma/Components/AsthmaBarChart',
    component: AsthmaBarChart,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaBarChartStoryArgs extends AsthmaBarChartProps {
    colorScheme: 'auto' | 'light' | 'dark';
    thresholdValue: number;
}

const render = (args: AsthmaBarChartStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Section style={{paddingTop: '16px'}} noTopMargin={true}>
            <AsthmaBarChart
                {...args}
                title="Chart Title"
                previewDataProvider={(start: Date, end: Date) => randomDataProvider(start, end, 0, 20000)}
                highlight={rawValue => rawValue < args.thresholdValue}
            />
        </Section>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        thresholdValue: 10000
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        thresholdValue: {
            name: "threshold value"
        }
    },
    render: render
};

