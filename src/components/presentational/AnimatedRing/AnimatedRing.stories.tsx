import React from 'react';
import { Layout } from '../../presentational';
import AnimatedRing, { AnimatedRingProps } from './AnimatedRing';
import './AnimatedRing.stories.css';

export default {
    title: 'Presentational/AnimatedRing',
    component: AnimatedRing,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AnimatedRingProps) => <Layout colorScheme="auto"><AnimatedRing {...args} /></Layout>

const children = <div className="animated-ring-story">Great Job!</div>;

export const Default = {
    args: {
        children: children
    },
    render: render
};

export const SpecificColor = {
    args: {
        children: children,
        color: '#71b345'
    },
    render: render
};