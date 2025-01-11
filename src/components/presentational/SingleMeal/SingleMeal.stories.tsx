import React, { useState } from 'react';
import { Layout } from '../../presentational';
import SingleMeal from './SingleMeal';
import { Meal } from '../../../helpers';
import { v4 as uuid } from 'uuid';

export default {
    title: 'Presentational/SingleMeal',
    component: SingleMeal,
    parameters: { layout: 'fullscreen' }
};

interface SingleMealStoryArgs {
    colorScheme: 'auto' | 'light' | 'dark';
    clickable: boolean;
    editable: boolean;
    withNumber: boolean;
    withImage: boolean;
}

const render = (args: SingleMealStoryArgs) => {
    const [selected, setSelected] = useState<boolean>(false);

    const meal: Meal = {
        id: uuid(),
        timestamp: new Date(),
        type: 'meal',
        description: 'Here is a description of the meal.'
    };

    const onClick = () => {
        setSelected(!selected);
    };

    const onEdit = () => {
        console.log('meal edited');
    };

    return <Layout colorScheme={args.colorScheme}>
        <SingleMeal
            meal={meal}
            mealImageUrl={args.withImage ? 'https://rkstudio-customer-assets.s3.us-east-1.amazonaws.com/MDH-UI/grilled_cheese.png' : undefined}
            number={args.withNumber ? 2 : undefined}
            color='orange'
            selected={selected}
            onClick={args.clickable ? onClick : undefined}
            onEdit={args.editable ? onEdit : undefined}
        />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        clickable: true,
        editable: true,
        withNumber: true,
        withImage: true
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        clickable: {
            name: 'is clickable?'
        },
        editable: {
            name: 'is editable?'
        },
        withNumber: {
            name: 'with meal number?'
        },
        withImage: {
            name: 'with meal image?'
        }
    },
    render: render
};