import React from 'react';
import NewBadgeView, { NewBadgeViewProps } from './NewBadgeView';

export default {
    title: 'View/NewBadgeView',
    component: NewBadgeView,
    parameters: { layout: 'fullscreen' }
};

const render = (args: NewBadgeViewProps) => <NewBadgeView {...args} />

export const Default = {
    args: {
        previewState: "default"
    },
    render: render
};