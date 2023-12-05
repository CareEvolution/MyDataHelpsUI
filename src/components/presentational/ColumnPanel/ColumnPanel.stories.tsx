import React from 'react';
import ColumnPanel, { ColumnPanelProps } from './ColumnPanel';
import { Card, Layout } from '../../presentational';

export default {
    title: 'Presentational/ColumnPanel',
    component: ColumnPanel,
    parameters: {layout: 'fullscreen'}
};

const render = (args: ColumnPanelProps) => {
    return <Layout colorScheme="auto">
        <ColumnPanel {...args}/>
    </Layout>
};

const createCard = (text: string) => {
    return <Card style={{padding: '16px'}}>{text}</Card>;
}

export const OneColumn = {
    args: {
        columns: 1,
        children: [
            createCard('Card 1'),
            createCard('Card 2'),
            createCard('Card 3')
        ]
    },
    render: render
};

export const TwoColumns = {
    args: {
        columns: 2,
        children: [
            createCard('Card 1'),
            createCard('Card 2'),
            createCard('Card 3')
        ]
    },
    render: render
};

export const ThreeColumns = {
    args: {
        columns: 3,
        children: [
            createCard('Card 1'),
            createCard('Card 2'),
            createCard('Card 3')
        ]
    },
    render: render
};
