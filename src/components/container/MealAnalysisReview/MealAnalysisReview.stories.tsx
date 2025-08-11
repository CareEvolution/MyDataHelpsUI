import React, { ComponentProps } from 'react';
import MealAnalysisReview from './MealAnalysisReview';
import { Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type MealAnalysisReviewStoryArgs = ComponentProps<typeof MealAnalysisReview> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<MealAnalysisReviewStoryArgs> = {
    title: 'Container/MealAnalysisReview',
    component: MealAnalysisReview,
    parameters: { layout: 'fullscreen' },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <MealAnalysisReview
                {...args}
                onEditMeal={() => console.log('edit meal')}
            />
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealAnalysisReviewStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'with meals to review'
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
            options: ['loading', 'no meals to review', 'with meals to review']
        },
        ...argTypesToHide(['onEditMeal', 'innerRef'])
    }
};