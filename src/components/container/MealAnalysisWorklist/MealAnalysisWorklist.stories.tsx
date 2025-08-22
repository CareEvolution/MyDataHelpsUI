import React, { ComponentProps } from 'react';
import MealAnalysisWorklist from './MealAnalysisWorklist';
import { Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type MealAnalysisWorklistStoryArgs = ComponentProps<typeof MealAnalysisWorklist> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: Parameters<typeof MealAnalysisWorklist>[0]['previewState'] | 'live';
};

const meta: Meta<MealAnalysisWorklistStoryArgs> = {
    title: 'Container/MealAnalysisWorklist',
    component: MealAnalysisWorklist,
    parameters: { layout: 'fullscreen' },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <MealAnalysisWorklist
                {...args}
                previewState={args.state !== 'live' ? args.state : undefined}
                onEditMeal={() => console.log('edit meal')}
            />
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealAnalysisWorklistStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        state: 'with meals to review'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        state: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'no meals to review', 'with meals to review', 'live']
        },
        ...argTypesToHide(['previewState', 'onEditMeal', 'innerRef'])
    }
};