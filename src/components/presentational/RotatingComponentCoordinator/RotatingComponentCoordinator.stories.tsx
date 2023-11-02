import React from 'react';
import Layout from '../Layout'
import RotatingComponentCoordinator, { RotatingComponentCoordinatorProps } from './RotatingComponentCoordinator'
import Card from '../Card';
import TextBlock from '../TextBlock';

export default {
    title: 'Presentational/RotatingComponentCoordinator',
    component: RotatingComponentCoordinator,
    parameters: {layout: 'fullscreen'}
};

const now = new Date();

let render = (args: RotatingComponentCoordinatorProps) => {
    return <Layout colorScheme="auto">
        <Card>
            <RotatingComponentCoordinator {...args}>
                <TextBlock>Here is the first text block.</TextBlock>
                <TextBlock>Here is the second text block.</TextBlock>
                <TextBlock>Here is the third text block.</TextBlock>
                <TextBlock>Here is the fourth text block.</TextBlock>
                <TextBlock>Here is the fifth text block.</TextBlock>
            </RotatingComponentCoordinator>
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        interval: 'day',
        startDate: now
    },
    argTypes: {
        interval: {
            control: 'radio',
            options: ['day', 'week', 'month']
        },
        startDate: {
            control: 'date'
        }
    },
    render: render
};