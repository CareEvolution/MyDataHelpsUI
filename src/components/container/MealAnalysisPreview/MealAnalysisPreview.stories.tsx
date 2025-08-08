import React, { ComponentProps } from 'react';
import MealAnalysisPreview from './MealAnalysisPreview';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type MealAnalysisPreviewStoryArgs = ComponentProps<typeof MealAnalysisPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
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
        previewState: 'with meals to review',
        variant: undefined
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
            options: ['loading', 'no meals to review', 'with meals to review', 'with meals to review - reloading']
        },
        variant: {
            name: 'variant',
            control: 'radio',
            options: ['default', 'compact'],
            mapping: {
                'default': undefined
            }
        },
        ...argTypesToHide(['onReviewAll', 'onEditMeal', 'innerRef'])
    }
};