import React, { ComponentProps } from 'react';
import MealAnalysisPreview from './MealAnalysisPreview';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type MealAnalysisPreviewStoryArgs = ComponentProps<typeof MealAnalysisPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: Parameters<typeof MealAnalysisPreview>[0]['previewState'] | 'live';
};

const meta: Meta<MealAnalysisPreviewStoryArgs> = {
    title: 'Container/MealAnalysisPreview',
    component: MealAnalysisPreview,
    parameters: { layout: 'fullscreen' },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <MealAnalysisPreview
                    {...args}
                    previewState={args.state !== 'live' ? args.state : undefined}
                    variant={args.variant === 'compact' ? 'compact' : undefined}
                    onReviewAll={() => console.log('review all')}
                    onEditMeal={() => console.log('edit meal')}
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealAnalysisPreviewStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        state: 'with meals to review',
        variant: 'default' as any
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        state: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'no meals to review', 'with meals to review', 'with meals to review - reloading', 'live']
        },
        variant: {
            name: 'variant',
            control: 'radio',
            options: ['default', 'compact'],
            mapping: {
                'default': undefined
            }
        },
        ...argTypesToHide(['previewState', 'onReviewAll', 'onEditMeal', 'innerRef'])
    }
};