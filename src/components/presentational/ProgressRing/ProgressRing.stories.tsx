import React from 'react';
import { Layout } from '../../presentational';
import ProgressRing, { ProgressRingProps } from './ProgressRing';
import './ProgressRing.stories.css';

export default {
    title: 'Presentational/ProgressRing',
    component: ProgressRing,
    parameters: {layout: 'fullscreen'}
};

const render = (args: ProgressRingProps) => <Layout colorScheme="auto"><ProgressRing {...args} /></Layout>

const children = <div className="progress-ring-story">Great Job!</div>;

export const Default = {
    args: {
        children: children
    },
    render: render
};

export const OneThirdDone = {
    args: {
        children: children,
        percentCompleted: 33
    },
    render: render
};

export const TwoThirdsDone = {
    args: {
        children: children,
        percentCompleted: 66
    },
    render: render
};

export const Done = {
    args: {
        children: children,
        percentCompleted: 100
    },
    render: render
};

export const DifferentColor = {
    args: {
        children: children,
        color: '#71b345'
    },
    render: render
};

export const Default_Animated = {
    args: {
        children: children,
        animate: true
    },
    render: render
};

export const OneThirdDone_Animated = {
    args: {
        children: children,
        percentCompleted: 33,
        animate: true
    },
    render: render
};

export const TwoThirdsDone_Animated = {
    args: {
        children: children,
        percentCompleted: 66,
        animate: true
    },
    render: render
};

export const Done_Animated = {
    args: {
        children: children,
        percentCompleted: 100,
        animate: true
    },
    render: render
};

export const DifferentColor_Animated = {
    args: {
        children: children,
        color: '#71b345',
        animate: true
    },
    render: render
};