import React from 'react';
import NewBadgeView, { NewBadgeViewProps } from './NewBadgeView';

export default {
    title: 'View/NewBadgeView',
    component: NewBadgeView,
    parameters: { layout: 'fullscreen' }
};

const render = (args: NewBadgeViewProps) => <NewBadgeView {...args} />

export const Single = {
    args: {
        badgeNumber: 3,
        pointsPerBadge: 1000
    },
    render: render
};