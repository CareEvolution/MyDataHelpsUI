import React from "react";
import { Card, Layout } from "..";
import { subDays } from "date-fns";
import SleepMoodChart, { SleepMoodChartProps, SleepMoodDataPoint } from "./SleepMoodChart";
import { Meta, StoryObj } from "@storybook/react";
import { predictableRandomNumber } from "../../../helpers/predictableRandomNumber";

const meta: Meta<typeof SleepMoodChart> = {
    title: "Presentational/SleepMoodChart",
    component: SleepMoodChart,
    parameters: { layout: 'fullscreen' },
    render: (args: SleepMoodChartProps, { loaded: { sampleData } }) => (
        <Layout colorScheme="auto">
            <Card>
                <SleepMoodChart {...args} data={sampleData} />
            </Card>
        </Layout>
    )
};

export default meta;
type Story = StoryObj<typeof SleepMoodChart>;

// Generate sample data for the last 15 days
async function generateSampleData(): Promise<SleepMoodDataPoint[]> {
    const data: SleepMoodDataPoint[] = [];
    const today = new Date();
    
    for (let i = 14; i >= 0; i--) {
        const date = subDays(today, i);
        const dateString = date.toISOString();
        
        // Generate sleep hours between 4 and 10
        const sleepHoursRandom = await predictableRandomNumber(`${dateString}-sleep`);
        const sleepHours = 4 + (sleepHoursRandom % 7);
        
        // Generate mood between 1 and 5
        // Make mood somewhat correlated with sleep hours
        const moodBase = Math.max(1, Math.min(5, Math.round(sleepHours / 2)));
        const moodRandom = await predictableRandomNumber(`${dateString}-mood`);
        const moodVariation = (moodRandom % 3) - 1; // -1, 0, or 1
        const mood = Math.max(1, Math.min(5, moodBase + moodVariation));
        
        data.push({
            date,
            sleepHours,
            mood
        });
    }
    
    return data;
}

// Generate sample data with a stronger correlation between sleep and mood
async function generateCorrelatedData(): Promise<SleepMoodDataPoint[]> {
    const data: SleepMoodDataPoint[] = [];
    const today = new Date();
    
    for (let i = 14; i >= 0; i--) {
        const date = subDays(today, i);
        const dateString = date.toISOString();
        
        // Generate sleep hours between 4 and 10
        const sleepHoursRandom = await predictableRandomNumber(`${dateString}-sleep-corr`);
        const sleepHours = 4 + (sleepHoursRandom % 7);
        
        // Generate mood more strongly correlated with sleep hours
        // 4-5 hours: mood 1-2
        // 6-7 hours: mood 2-3
        // 8-9 hours: mood 4-5
        // 10+ hours: mood 3-4
        let moodRange: [number, number];
        
        if (sleepHours < 6) {
            moodRange = [1, 2];
        } else if (sleepHours < 8) {
            moodRange = [2, 3];
        } else if (sleepHours < 10) {
            moodRange = [4, 5];
        } else {
            moodRange = [3, 4];
        }
        
        const moodRandom = await predictableRandomNumber(`${dateString}-mood-corr`);
        const mood = moodRange[0] + (moodRandom % (moodRange[1] - moodRange[0] + 1));
        
        data.push({
            date,
            sleepHours,
            mood
        });
    }
    
    return data;
}

// Generate sample data with no correlation between sleep and mood
async function generateUncorrelatedData(): Promise<SleepMoodDataPoint[]> {
    const data: SleepMoodDataPoint[] = [];
    const today = new Date();
    
    for (let i = 14; i >= 0; i--) {
        const date = subDays(today, i);
        const dateString = date.toISOString();
        
        // Generate sleep hours between 4 and 10
        const sleepHoursRandom = await predictableRandomNumber(`${dateString}-sleep-uncorr`);
        const sleepHours = 4 + (sleepHoursRandom % 7);
        
        // Generate completely random mood between 1 and 5
        const moodRandom = await predictableRandomNumber(`${dateString}-mood-uncorr`);
        const mood = 1 + (moodRandom % 5);
        
        data.push({
            date,
            sleepHours,
            mood
        });
    }
    
    return data;
}

export const Default: Story = {
    args: {
        title: "Sleep Duration and Mood (Last 15 Days)",
        isLoading: false
    },
    loaders: [
        async () => ({
            sampleData: await generateSampleData()
        })
    ]
};

export const StrongCorrelation: Story = {
    args: {
        title: "Sleep and Mood - Strong Correlation",
        isLoading: false
    },
    loaders: [
        async () => ({
            sampleData: await generateCorrelatedData()
        })
    ]
};

export const NoCorrelation: Story = {
    args: {
        title: "Sleep and Mood - No Correlation",
        isLoading: false
    },
    loaders: [
        async () => ({
            sampleData: await generateUncorrelatedData()
        })
    ]
};

export const Loading: Story = {
    args: {
        title: "Sleep and Mood Relationship",
        isLoading: true,
        data: []
    }
};

export const NoData: Story = {
    args: {
        title: "Sleep and Mood Relationship",
        isLoading: false,
        data: []
    }
};
