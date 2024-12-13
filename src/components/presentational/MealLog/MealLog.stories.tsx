import React from 'react';
import { Layout } from '../../presentational';
import MealLog from './MealLog';
import MealCoordinator from '../../container/MealCoordinator';
import { MealCoordinatorPreviewState } from '../../container';
import Card from "../Card";
import { Meta, StoryObj } from "@storybook/react";
import { argTypesToHide } from "../../../../.storybook/helpers";

type MealLogStoryArgs = React.ComponentProps<typeof MealLog> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | MealCoordinatorPreviewState | 'live';
};

const meta: Meta<MealLogStoryArgs> = {
    title: 'Presentational/MealLog',
    component: MealLog,
    parameters: { layout: 'fullscreen' },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <MealCoordinator previewState={args.previewState !== 'live' ? args.previewState : undefined}>
                <Card>
                    <MealLog
                        preview={args.previewState !== 'live'}
                        onEditMeal={() => console.log('edit meal')}
                        showMealNumbers={args.showMealNumbers}
                        highlightSelectedMeal={args.highlightSelectedMeal}
                    />
                </Card>
            </MealCoordinator>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealLogStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'with data',
        showMealNumbers: true,
        highlightSelectedMeal: true
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
            options: ['loading', 'no data', 'with data', 'live']
        },
        showMealNumbers: {
            name: 'show meal numbers?'
        },
        highlightSelectedMeal: {
            name: 'highlight selected meal?'
        },
        ...argTypesToHide(['preview', 'onEditMeal', 'innerRef'])
    }
};