import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AsthmaLibraryCategoryView, { AsthmaLibraryCategoryViewProps } from './AsthmaLibraryCategoryView';

export default {
    title: 'Asthma/Views/AsthmaLibraryCategoryView',
    component: AsthmaLibraryCategoryView,
    parameters: { layout: 'fullscreen' },
    render: args => {
        const title = {
            'basics': 'Asthma Basics',
            'control': 'Asthma Control',
            'medications': 'Medications',
            'triggers': 'Triggers',
            'medical-team': 'You & Your Medical Team',
            'more': 'More'
        }[args.category] ?? '';
        return <AsthmaLibraryCategoryView {...args} title={title} />;
    }
} as Meta<AsthmaLibraryCategoryViewProps>;

export const Default: StoryObj<AsthmaLibraryCategoryViewProps> = {
    args: {
        colorScheme: 'auto',
        category: 'triggers',
        libraryBaseUrl: 'https://asthma.careevolutionapps.com/library/'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        category: {
            name: 'category',
            control: 'radio',
            options: ['basics', 'control', 'medications', 'triggers', 'medical-team', 'more']
        }
    }
};