import React, { ComponentProps } from 'react';
import MealAnalysisView from './MealAnalysisView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type MealAnalysisViewStoryArgs = ComponentProps<typeof MealAnalysisView> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: Parameters<typeof MealAnalysisView>[0]['previewState'] | 'live';
};

const meta: Meta<MealAnalysisViewStoryArgs> = {
    title: 'View/MealAnalysisView',
    component: MealAnalysisView,
    parameters: { layout: 'fullscreen' },
    render: args => {
        return <MealAnalysisView
            {...args}
            previewState={args.state !== 'live' ? args.state : undefined}
            onEditMeal={() => console.log('edit meal')}
        />;
    }
};
export default meta;

type Story = StoryObj<MealAnalysisViewStoryArgs>;

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