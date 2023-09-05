import React from 'react';
import { Layout } from '../../presentational';
import NewPoints, { NewPointsProps } from './NewPoints';

export default {
    title: 'Container/NewPoints',
    component: NewPoints,
    parameters: {layout: 'fullscreen'}
};

const render = (args: NewPointsProps) => <Layout><NewPoints {...args} /></Layout>

export const SingleEntry = {
    args: {
        entries: [
            {
                name: 'Some Activity',
                points: 125,
                message: {
                    title: 'Great Job!',
                    text: 'Great job completing some activity.'
                }
            }
        ]
    },
    render: render
};

export const SingleEntryWithBonus = {
    args: {
        entries: [
            {
                name: 'Some Activity',
                points: 125,
                bonusPoints: 50,
                message: {
                    title: 'Great Job!',
                    text: 'Great job completing some activity.'
                }
            }
        ]
    },
    render: render
};

export const SingleEntryWithNextReward = {
    args: {
        entries: [
            {
                name: 'Some Activity',
                points: 125,
                message: {
                    title: 'Great Job!',
                    text: 'Great job completing some activity.'
                }
            }
        ],
        pointsToNextReward: 125
    },
    render: render
};

export const MultiEntry = {
    args: {
        entries: [
            {
                name: 'Some Activity',
                points: 125,
                message: {
                    title: 'Great Job!',
                    text: 'Great job completing some activity.'
                }
            },
            {
                name: 'Some Other Activity',
                points: 85,
                message: {
                    title: 'Great Job!',
                    text: 'Great job completing some other activity.'
                }
            }
        ]
    },
    render: render
};

export const MultiEntryWithBonus = {
    args: {
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
        ]
    },
    render: render
};

export const MultiEntryWithNextReward = {
    args: {
        entries: [
            {
                name: 'Some Activity',
                points: 125,
                message: {
                    title: 'Great Job!',
                    text: 'Great job completing some activity.'
                }
            },
            {
                name: 'Some Other Activity',
                points: 85,
                message: {
                    title: 'Great Job!',
                    text: 'Great job completing some other activity.'
                }
            }
        ],
        pointsToNextReward: 200
    },
    render: render
};
