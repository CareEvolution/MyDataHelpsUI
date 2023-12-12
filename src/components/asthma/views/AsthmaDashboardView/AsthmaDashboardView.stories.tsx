import React from 'react';
import AsthmaDashboardView, { AsthmaDashboardViewProps } from './AsthmaDashboardView';

export default {
    title: 'Asthma/Views/AsthmaDashboardView',
    component: AsthmaDashboardView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaDashboardViewProps) => <AsthmaDashboardView {...args} />;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};

