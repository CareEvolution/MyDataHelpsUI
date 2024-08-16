import React from 'react';
import { Card, DateRangeCoordinator, Layout, MealLog } from '../../presentational';
import { MealCoordinatorPreviewState } from './MealCoordinator.previewData';
import MealCoordinator from '../MealCoordinator';

export default {
    title: 'Container/MealCoordinator',
    component: MealCoordinator,
    parameters: { layout: 'fullscreen' }
};

interface MealCoordinatorStoryArgs {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | MealCoordinatorPreviewState;
}

const render = (args: MealCoordinatorStoryArgs) => {
    const onEditMeal = () => {
        console.log('edit meal');
    };

    return <Layout colorScheme={args.colorScheme}>
        <DateRangeCoordinator intervalType="Day">
            <MealCoordinator previewState={args.previewState}>
                <Card>
                    <MealLog preview={true} onEditMeal={() => onEditMeal()} />
                </Card>
            </MealCoordinator>
        </DateRangeCoordinator>
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