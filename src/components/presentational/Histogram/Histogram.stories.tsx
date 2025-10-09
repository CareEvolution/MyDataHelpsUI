import React from 'react';
import { Layout } from '../../presentational';
import Histogram, { HistogramProps } from './Histogram';
import { Meta } from '@storybook/react/*';

const meta: Meta<typeof Histogram> = {
    title: 'Presentational/Histogram',
    component: Histogram,
    parameters: { layout: 'fullscreen' },
    render: (args: HistogramProps) => <Layout colorScheme="auto"><Histogram {...args} /></Layout>
};

const sampleEntries = [
    { label: 'Category A', color: '#c4291c', value: 25 },
    { label: 'Category B', color: '#e35c33', value: 40 },
    { label: 'Category C', color: '#5db37e', value: 15 },
    { label: 'Category D', color: '#429bdf', value: 30 }
];

const sampleEntriesWithOnSelect = [
    { label: 'Category A', color: '#c4291c', value: 25, onSelect: () => console.log('Selected Category A') },
    { label: 'Category B', color: '#e35c33', value: 40, onSelect: () => console.log('Selected Category B') },
    { label: 'Category C', color: '#5db37e', value: 15, onSelect: () => console.log('Selected Category C') },
    { label: 'Category D', color: '#429bdf', value: 30, onSelect: () => console.log('Selected Category D') }
];

export const Default = {
    args: {
        entries: sampleEntries
    }
};

export const Selectable = {
    args: {
        entries: sampleEntriesWithOnSelect
    }
};

export const WithLinkColorDefinition = {
    args: {
        entries: sampleEntriesWithOnSelect,
        linkColor: { lightMode: '#71b345', darkMode: '#a1e375' }
    }
};

export default meta;