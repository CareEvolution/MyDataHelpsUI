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
    const [value, setValue] = useState<number | undefined>(3);

    return <Layout colorScheme={args.colorScheme}>
        <DiscreteScale {...args} value={value} onChange={setValue} />
        <div style={{ padding: '16px 0', textAlign: 'center' }}>The current value is {value ? value : 'not set'}.</div>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        sliderColor: '#51d521',
        tickCount: 11,
        minLabel: 'Min Label',
        maxLabel: 'Max Label'
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
            control: {
                type: 'number',
                min: 2,
                max: 21
            }
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

