import React from 'react';
import { Layout } from '../../presentational';
import MealButtons from './MealButtons';
import MealCoordinator from '../../container/MealCoordinator';
import Card from '../Card';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type MealButtonsStoryArgs = React.ComponentProps<typeof MealButtons> & {
    colorScheme: 'auto' | 'light' | 'dark';
    previewState: 'loading' | 'loaded' | 'live';
};

const meta: Meta<MealButtonsStoryArgs> = {
    title: 'Presentational/MealButtons',
    component: MealButtons,
    parameters: { layout: 'fullscreen' },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <MealCoordinator previewState={args.previewState !== 'live' ? args.previewState === 'loading' ? 'loading' : 'with data' : undefined}>
                <Card>
                    <MealButtons
                        preview={args.previewState !== 'live'}
                        autoLaunchEditor={args.autoLaunchEditor}
                        onEditMeal={() => console.log('edit meal')}
                    />
                </Card>
            </MealCoordinator>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealButtonsStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded',
        autoLaunchEditor: false
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
            options: ['loading', 'loaded', 'live']
        },
        autoLaunchEditor: {
            name: 'auto-launch editor?'
        },
        ...argTypesToHide(['preview', 'onEditMeal', 'innerRef'])
    }
};