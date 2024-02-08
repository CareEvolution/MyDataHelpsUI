import React from 'react';
import RecentDailyDataBarChart, { RecentDailyDataBarChartProps } from './RecentDailyDataBarChart';
import { Layout, Section } from '../../presentational';

export default {
    title: 'Container/RecentDailyDataBarChart',
    component: RecentDailyDataBarChart,
    parameters: {layout: 'fullscreen'}
};

interface RecentDailyDataBarChartStoryArgs extends RecentDailyDataBarChartProps {
    colorScheme: 'auto' | 'light' | 'dark';
    thresholdValue: number;
    thresholdComparison: 'less than' | 'more than';
}

const render = (args: RecentDailyDataBarChartStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Section style={{paddingTop: '16px'}} noTopMargin={true}>
            <RecentDailyDataBarChart
                {...args}
                highlight={args.thresholdComparison === 'less than' ?
                    rawValue => rawValue < args.thresholdValue :
                    rawValue => rawValue > args.thresholdValue}
            />
        </Section>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded with data',
        title: 'Chart Title',
        thresholdValue: 10000,
        thresholdComparison: 'less than'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'loaded without data', 'loaded with data']
        },
        thresholdValue: {
            name: "threshold value",
            if: {arg: 'previewState', eq: 'loaded with data'}
        },
        thresholdComparison: {
            name: "threshold comparison",
            control: 'radio',
            options: ['less than', 'more than'],
            if: {arg: 'previewState', eq: 'loaded with data'}
        }
    },
    render: render
};

