import React from 'react';
import AsthmaSleepView, { AsthmaSleepViewProps } from './AsthmaSleepView';

export default {
    title: 'Asthma/Views/AsthmaSleepView',
    component: AsthmaSleepView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaSleepViewProps) => <AsthmaSleepView {...args} />;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};

