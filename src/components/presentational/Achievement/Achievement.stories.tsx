import React from 'react'
import Achievement from './Achievement'
import { Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';
import { faBicycle, faDog, faHeartbeat, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { ValueProviderFactory } from "../../../helpers";

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
        previewState: 'complete',
        maxValue: 7,
        targetValue: 4,
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
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'not started', 'in progress', 'complete', 'maxed out', 'random']
        },
        maxValue: {
            name: 'maximum value'
        },
        targetValue: {
            name: 'target value'
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

export const Live: Story = {
    args: {
        colorScheme: 'auto'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        }
    },
    render: args => <Layout colorScheme={args.colorScheme}>
        <Achievement
            label="Value From Static Provider"
            targetValue={5}
            maxValue={10}
            valueProvider={ValueProviderFactory.createStaticIntegerValueProvider(3)}
            icon={faDog}
            inProgressColor={"#6ddec9"}
            completedColor={"#d81442"}
        />
        <Achievement
            label="Value From Random Provider"
            targetValue={5}
            maxValue={10}
            valueProvider={ValueProviderFactory.createRandomIntegerValueProvider(10)}
            icon={faBicycle}
            inProgressColor={"#6dde76"}
            completedColor={"#2f62e4"}
        />
        <Achievement
            label="Value From Custom Field Provider"
            targetValue={5}
            maxValue={10}
            valueProvider={ValueProviderFactory.createCustomFieldIntegerValueProvider('SomeCustomField')}
            icon={faWandSparkles}
            inProgressColor={"#a4de6d"}
            completedColor={"#ca19ee"}
        />
    </Layout>
};
