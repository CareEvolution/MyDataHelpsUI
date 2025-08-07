import React, { ComponentProps } from 'react';
import MealAnalysisPreview from './MealAnalysisPreview';
import { Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type MealAnalysisPreviewStoryArgs = ComponentProps<typeof MealAnalysisPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<MealAnalysisPreviewStoryArgs> = {
    title: 'Container/MealAnalysisPreview',
    component: MealAnalysisPreview,
    parameters: { layout: 'fullscreen' },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <MealAnalysisPreview
                previewState={args.previewState}
                onEditMeal={() => console.log('edit meal')}
            />
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealAnalysisPreviewStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'default'
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
            options: ['default']
        },
        ...argTypesToHide(['innerRef'])
    }
};