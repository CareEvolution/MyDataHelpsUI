import React from 'react';
import NewPointsView, { NewPointsViewProps } from './NewPointsView';
import { NewPointsProps } from "../../container/NewPoints/NewPoints";

export default {
    title: 'View/NewPointsView',
    component: NewPointsView,
    parameters: {layout: 'fullscreen'}
};

const newPointsProps: NewPointsProps = {
    entries: [
        {
            name: 'Some Activity',
            points: 125,
            bonusPoints: 30,
            message: {
                title: 'Great Job!',
                text: 'Great job completing some activity.'
            }
        },
        {
            name: 'Some Other Activity',
            points: 85,
            bonusPoints: 10,
            message: {
                title: 'Great Job!',
                text: 'Great job completing some other activity.'
            }
        },
        {
            name: 'Yet another activity with a really long name that should be truncated.',
            points: 100,
            message: {
                title: 'Great Job!',
                text: 'Great job completing some other activity.'
            }
        }
    ],
    pointsToNextReward: 100
};

const render = (args: NewPointsViewProps) => <NewPointsView {...args} />

export const Default = {
    args: {
        newPointsProps: newPointsProps
    },
    render: render
};

export const DifferentButtonText = {
    args: {
        newPointsProps: {...newPointsProps, doneButtonText: 'CLOSE'}
    },
    render: render
};

export const DifferentColor = {
    args: {
        newPointsProps: newPointsProps,
        primaryColor: '#71b345'
    },
    render: render
};

export const DarkMode = {
    args: {
        newPointsProps: newPointsProps,
        colorScheme: 'dark'
    },
    render: render
};