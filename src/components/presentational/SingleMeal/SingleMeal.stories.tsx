import React from 'react';
import { Layout } from '../../presentational';
import SingleMeal from './SingleMeal';
import { Meal } from '../../../helpers';
import { noop } from '../../../helpers/functions';

export default {
    title: 'Presentational/SingleMeal',
    component: SingleMeal,
    parameters: {layout: 'fullscreen'}
};

interface SingleMealStoryArgs {
    colorScheme: 'auto' | 'light' | 'dark';
    selected: boolean;
}

const render = (args: SingleMealStoryArgs) => {
    const meal = {
        timestamp: new Date(),
        nutrients: {
            'dietaryEnergyConsumed': {'total': 525.498, values: [], 'units': 'kcal'},
            'dietaryFatTotal': {'total': 20.232770000000002, values: [], 'units': 'g'},
            'dietaryCarbohydrates': {'total': 64.460090000000008, values: [], 'units': 'g'},
            'dietaryProtein': {'total': 24.27504, values: [], 'units': 'g'}
        }
    } as Meal;

    return <Layout colorScheme={args.colorScheme}>
        <SingleMeal meal={meal} number={2} color='cyan' selected={args.selected} onClick={noop}/>
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