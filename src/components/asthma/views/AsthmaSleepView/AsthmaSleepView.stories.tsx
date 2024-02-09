import React from 'react';
import AsthmaSleepView, { AsthmaSleepViewProps } from './AsthmaSleepView';

export default {
    title: 'Asthma/Views/AsthmaSleepView',
    component: AsthmaSleepView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaSleepViewStoryArgs extends AsthmaSleepViewProps {
    withAlert: boolean;
}

const render = (args: AsthmaSleepViewStoryArgs) => {
    return <AsthmaSleepView
        {...args}
        previewState="default"
        alert={args.withAlert ? 'SleepDisturbances' : undefined}
    />;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        withAlert: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        withAlert: {
            name: 'with alert'
        }
    },
    render: render
};

