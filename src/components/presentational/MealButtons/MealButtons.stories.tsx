import React from 'react';
import { Layout } from '../../presentational';
import MealButtons from './MealButtons';
import MealCoordinator, { MealCoordinatorPreviewState } from '../../container/MealCoordinator';
import Card from '../Card';

export default {
    title: 'Presentational/MealButtons',
    component: MealButtons,
    parameters: { layout: 'fullscreen' }
};

interface MealButtonsStoryArgs {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | MealCoordinatorPreviewState;
}

const render = (args: MealButtonsStoryArgs) => {
    const onEditMeal = () => {
        console.log('edit meal');
    };

    return <Layout colorScheme={args.colorScheme}>
        <MealCoordinator previewState={args.previewState}>
            <Card>
                <MealButtons preview={true} onEditMeal={() => onEditMeal()} />
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