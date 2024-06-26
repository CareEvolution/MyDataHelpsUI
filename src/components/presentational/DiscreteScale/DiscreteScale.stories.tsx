import React, { useState } from 'react';
import DiscreteScale, { DiscreteScaleProps } from './DiscreteScale';
import { Layout } from '../../presentational';

export default {
    title: 'Presentational/DiscreteScale',
    component: DiscreteScale,
    parameters: { layout: 'fullscreen' }
};

interface DiscreteScaleStoryArgs extends DiscreteScaleProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: DiscreteScaleStoryArgs) => {
    const [value, setValue] = useState<number>(3);

    return <Layout colorScheme={args.colorScheme}>
        <DiscreteScale {...args} value={value} onChange={setValue} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        sliderColor: '#d36540',
        tickCount: 7,
        minLabel: 'No Stress',
        maxLabel: 'Extremely Stressed'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        sliderColor: {
            name: 'slider color',
            control: 'color'
        },
        tickCount: {
            name: 'tick count',
            control: 'number'
        },
        minLabel: {
            name: 'minimum value label'
        },
        maxLabel: {
            name: 'maximum value label'
        }
    },
    render: render
};

