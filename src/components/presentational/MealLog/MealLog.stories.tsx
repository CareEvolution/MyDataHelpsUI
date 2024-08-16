import React from 'react';
import { Layout } from '../../presentational';
import MealLog from './MealLog';
import MealCoordinator from '../../container/MealCoordinator';
import { MealCoordinatorPreviewState } from '../../container';
import Card from "../Card";

export default {
    title: 'Presentational/MealLog',
    component: MealLog,
    parameters: { layout: 'fullscreen' }
};

interface MealLogStoryArgs {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | MealCoordinatorPreviewState;
}

const render = (args: MealLogStoryArgs) => {
    const onEditMeal = () => {
        console.log('edit meal');
    };

    return <Layout colorScheme={args.colorScheme}>
        <MealCoordinator previewState={args.previewState}>
            <Card>
                <MealLog preview={true} onEditMeal={() => onEditMeal()} />
            </Card>
        </MealCoordinator>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'with data'
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
            options: ['loading', 'no data', 'with data']
        }
    },
    render: render
};