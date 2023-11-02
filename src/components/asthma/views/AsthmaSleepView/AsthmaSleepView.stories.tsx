import React from 'react';
import AsthmaSleepView from './AsthmaSleepView';

export default {
    title: 'Asthma/Views/AsthmaSleepView',
    component: AsthmaSleepView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaSleepViewStoryProps {
    alert?: string;
}

const render = (args: AsthmaSleepViewStoryProps) => <AsthmaSleepView previewState="default" alert={args.alert === '[None]' ? undefined : args.alert}/>;

export const Default = {
    args: {
        alert: '[None]'
    },
    argTypes: {
        alert: {
            control: 'radio',
            options: ['[None]', 'SleepDisturbances']
        }
    },
    render: render
};

