import React, { ComponentProps } from 'react';
import { Card, Layout } from '../../presentational';
import MealAnalysis from './MealAnalysis';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import { add, startOfToday } from 'date-fns';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { Meta, StoryObj } from '@storybook/react';

type MealAnalysisStoryArgs = ComponentProps<typeof MealAnalysis> & {
    colorScheme: 'auto' | 'light' | 'dark';
}

const meta: Meta<MealAnalysisStoryArgs> = {
    title: 'Presentational/MealAnalysis',
    component: MealAnalysis,
    parameters: { layout: 'fullscreen' },
    render: args => {
        const meal: Meal = {
            id: uuid(),
            timestamp: new Date(),
            type: 'meal',
            analysis: {
                timestamp: add(startOfToday(), { hours: 10, minutes: 23 }),
                items: [{ 'name': 'bread', 'confidenceScore': 0.95 }, { 'name': 'cheese', 'confidenceScore': 0.89 }, { 'name': 'butter', 'confidenceScore': 0.7 }]
            }
        };

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <MealAnalysis
                    variant={args.variant === 'worklist' ? 'worklist' : undefined}
                    meal={meal}
                    onAddItem={() => console.log('on add item')}
                    onAddItems={() => console.log('on add items')}
                    onReviewItems={() => console.log('on review items')}
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealAnalysisStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        variant: 'default' as any
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        variant: {
            name: 'variant',
            control: 'radio',
            options: ['default', 'worklist'],
            mapping: {
                'default': undefined
            }
        },
        ...argTypesToHide(['meal', 'onAddItem', 'onAddItems', 'onReviewItems', 'innerRef'])
    }
};