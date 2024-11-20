import React from 'react';
import { Card, DateRangeCoordinator, Layout, MealLog } from '../../presentational';
import MealCoordinator from '../MealCoordinator';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type MealCoordinatorStoryArgs = React.ComponentProps<typeof MealCoordinator> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<MealCoordinatorStoryArgs> = {
    title: 'Container/MealCoordinator',
    component: MealCoordinator,
    parameters: { layout: 'fullscreen' },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Day">
                <MealCoordinator previewState={args.previewState}>
                    <Card>
                        <MealLog preview={true} onEditMeal={() => console.log('edit meal')} />
                    </Card>
                </MealCoordinator>
            </DateRangeCoordinator>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealCoordinatorStoryArgs>;

export const Default: Story = {
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
        },
        ...argTypesToHide(['innerRef'])
    }
};