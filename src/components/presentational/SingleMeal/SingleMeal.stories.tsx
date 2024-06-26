import React from 'react';
import { Layout } from '../../presentational';
import SingleMeal from './SingleMeal';
import { Meal } from '../../../helpers';
import { noop } from '../../../helpers/functions';

export default {
    title: 'Presentational/SingleMeal',
    component: SingleMeal,
    parameters: { layout: 'fullscreen' }
};

interface SingleMealStoryArgs {
    colorScheme: 'auto' | 'light' | 'dark';
    selected: boolean;
}

const render = (args: SingleMealStoryArgs) => {
    const meal = {
        timestamp: new Date(),
        type: 'meal'
    } as Meal;

    return <Layout colorScheme={args.colorScheme}>
        <SingleMeal meal={meal} number={2} color='cyan' selected={args.selected} onClick={noop} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        selected: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        }
    },
    render: render
};