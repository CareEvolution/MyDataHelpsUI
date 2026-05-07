import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AsthmaLibraryCategoryView, { AsthmaLibraryCategoryViewProps } from './AsthmaLibraryCategoryView';
import { argTypesToHide } from '../../../../../.storybook/helpers';

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
        return <AsthmaLibraryCategoryView {...args} title={title} libraryBaseUrl="https://asthma.careevolutionapps.com/library/" />;
    }
} as Meta<AsthmaLibraryCategoryViewProps>;

export const Default: StoryObj<AsthmaLibraryCategoryViewProps> = {
    args: {
        colorScheme: 'auto',
        category: 'triggers'
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
        },
        ...argTypesToHide(['title', 'libraryBaseUrl'])
    }
};