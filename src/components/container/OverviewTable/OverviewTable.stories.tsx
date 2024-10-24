import React from 'react'
import OverviewTable from './OverviewTable'
import { Card, Layout } from '../../presentational'
import { Meta, StoryObj } from '@storybook/react';

type OverviewTableStoryArgs = React.ComponentProps<typeof OverviewTable> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<OverviewTableStoryArgs> = {
    title: 'Container/OverviewTable',
    component: OverviewTable,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <OverviewTable {...args} />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<OverviewTableStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'mood'
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
            options: ['mood']
        }
    }
};
