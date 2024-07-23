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
}

const render = (args: SingleMealStoryArgs) => {
    const [selected, setSelected] = useState<boolean>(false);

    const meal: Meal = {
        id: uuid(),
        timestamp: new Date(),
        type: 'meal'
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
            number={2}
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
        editable: true
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