import React from 'react';
import ExploreGameRevealView from './ExploreGameRevealView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type ExploreGameRevealViewStoryArgs = React.ComponentProps<typeof ExploreGameRevealView>;

const meta: Meta<ExploreGameRevealViewStoryArgs> = {
    title: 'View/ExploreGameRevealView',
    component: ExploreGameRevealView,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => <div>
        <style>{':root { --mdhui-color-primary: #375A4FFF; }'}</style>
        <ExploreGameRevealView {...args} />
    </div>
};
export default meta;

type Story = StoryObj<ExploreGameRevealViewStoryArgs>;

export const Default: Story = {
    args: {
        previewState: 'default'
    },
    argTypes: {
        previewState: {
            name: 'preview state',
            control: 'radio',
            options: ['default', 'loading']
        },
        ...argTypesToHide(['colorScheme', 'placeId', 'gameStateCustomFieldName', 'innerRef'])
    }
};