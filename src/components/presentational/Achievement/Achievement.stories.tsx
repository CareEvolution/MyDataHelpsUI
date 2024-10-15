import React from 'react'
import Achievement from './Achievement'
import { Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

type AchievementStoryArgs = React.ComponentProps<typeof Achievement> & {
    colorScheme: 'auto' | 'light' | 'dark';
    iconType: 'default' | 'custom';
};

const meta: Meta<AchievementStoryArgs> = {
    title: 'Presentational/Achievement',
    component: Achievement,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => <Layout colorScheme={args.colorScheme}>
        <Achievement {...args} icon={args.iconType === 'custom' ? faHeartbeat : undefined} />
    </Layout>
};
export default meta;

type Story = StoryObj<AchievementStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        maxValue: 7,
        targetValue: 4,
        currentValue: 5,
        iconType: 'default',
        label: 'Days Wearing Fitness Tracker',
        notStartedColor: '',
        inProgressColor: '',
        completedColor: ''
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        maxValue: {
            name: 'maximum value'
        },
        targetValue: {
            name: 'target value'
        },
        currentValue: {
            name: 'current value'
        },
        iconType: {
            name: 'icon',
            control: 'radio',
            options: ['default', 'custom']
        },
        notStartedColor: {
            name: 'not started color',
            control: 'color'
        },
        inProgressColor: {
            name: 'in progress color',
            control: 'color'
        },
        completedColor: {
            name: 'completed color',
            control: 'color'
        }
    }
};
