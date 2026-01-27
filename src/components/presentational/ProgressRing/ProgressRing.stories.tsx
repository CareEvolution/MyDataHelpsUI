import React from 'react';
import { Layout } from '../../presentational';
import ProgressRing from './ProgressRing';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type ProgressRingStoryArgs = React.ComponentProps<typeof ProgressRing> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

export default {
    title: 'Presentational/ProgressRing',
    component: ProgressRing,
    parameters: { layout: 'fullscreen' },
    render: (args: ProgressRingStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <ProgressRing {...args}>
                <div style={{ fontWeight: 'bold', fontSize: '28px' }}>Great Job!</div>
            </ProgressRing>
        </Layout>;
    }
};

export const Default: StoryObj<ProgressRingStoryArgs> = {
    args: {
        colorScheme: 'auto',
        diameter: 220,
        strokeWidth: 20,
        color: undefined,
        incompleteColor: undefined,
        percentCompleted: 100,
        animate: true
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        diameter: {
            name: 'diameter',
            control: {
                type: 'range',
                min: 40,
                max: 400,
                step: 1
            }
        },
        strokeWidth: {
            name: 'strokeWidth',
            control: {
                type: 'range',
                min: 1,
                max: 40,
                step: 1
            }
        },
        color: {
            name: 'color',
            control: 'color'
        },
        incompleteColor: {
            name: 'incomplete color',
            control: 'color'
        },
        percentCompleted: {
            name: 'percent completed',
            control: {
                type: 'range',
                min: 0,
                max: 100,
                step: 1
            }
        },
        animate: {
            name: 'animate',
            control: 'boolean'
        },
        ...argTypesToHide(['style', 'innerRef'])
    }
};