import React from 'react';
import ExploreGameRevealView from './ExploreGameRevealView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import waterFallImage from './waterfall.webp';

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
        previewState: 'loaded',
        place: {
            id: '12345',
            category: 'A Waterfall',
            hint: 'This is a hint about the waterfall.',
            name: 'Slippery Moss Falls',
            location: 'British Columbia',
            fact: 'This waterfall is over 50 meters tall and is a popular tourist destination.  Its waters are home to a variety of fish species found nowhere else on earth.',
            imageUrl: waterFallImage,
            altText: 'Some alt text for screen readers.'
        }
    },
    argTypes: {
        previewState: {
            name: 'preview state',
            control: 'radio',
            options: ['loaded', 'loading']
        },
        ...argTypesToHide(['colorScheme', 'place', 'gameStateCustomFieldName', 'innerRef'])
    }
};