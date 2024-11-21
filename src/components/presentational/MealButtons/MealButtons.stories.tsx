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
    previewState: 'loading' | MealCoordinatorPreviewState | 'live';
}

const onAdd = () => {
    console.log('meal added');
};

const render = (args: MealButtonsStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <MealCoordinator previewState={args.previewState !== 'live' ? args.previewState : undefined}>
            <Card>
                <MealButtons preview={args.previewState !== 'live'} onAdd={onAdd} />
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
            options: ['loading', 'no data', 'with data', 'live']
        }
    },
    render: render
};