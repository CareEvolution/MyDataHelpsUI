import React from 'react';
import NewPointsView, { NewPointsViewProps } from './NewPointsView';

export default {
    title: 'View/NewPointsView',
    component: NewPointsView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: NewPointsViewProps) => <NewPointsView {...args} />

export const Single = {
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

export const SingleWithBonus = {
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

export const SingleWithNextReward = {
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

export const SingleWithBonusAndNextReward = {
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
        ],
        pointsToNextReward: 125
    },
    render: render
};

export const Multi = {
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

export const MultiWithBonus = {
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
            }
        ]
    },
    render: render
};

export const MultiWithNextReward = {
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

export const MultiWithBonusAndNextReward = {
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
                bonusPoints: 10,
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

export const DifferentButtonText = {
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
        doneButtonText: 'CLOSE'
    },
    render: render
};

export const DifferentColor = {
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
        ],
        pointsToNextReward: 100,
        primaryColor: '#71b345'
    },
    render: render
};

export const DarkMode = {
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
        ],
        pointsToNextReward: 100,
        colorScheme: 'dark'
    },
    render: render
};