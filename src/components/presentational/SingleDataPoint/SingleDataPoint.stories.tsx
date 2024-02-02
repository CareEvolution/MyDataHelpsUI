import React from 'react';
import SingleDataPoint, { SingleDataPointProps } from './SingleDataPoint';
import { Card, Layout } from '..';
import { noop } from '../../../helpers/functions';

export default {
    title: 'Presentational/SingleDataPoint',
    component: SingleDataPoint,
    parameters: {layout: 'fullscreen'}
};

interface SingleDataPointStoryProps extends SingleDataPointProps {
    colorScheme: 'auto' | 'light' | 'dark';
    clickable: boolean;
}

const render = (args: SingleDataPointStoryProps) => {
    return <Layout colorScheme={args.colorScheme}>
        <Card style={{padding: '16px'}}>
            <SingleDataPoint {...args} onClick={args.clickable ? noop : undefined}/>
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        hasValue: true,
        value: 64,
        units: 'BPM',
        label: 'Resting HR (Day)',
        statusText: 'In range',
        statusColor: '#188A83',
        clickable: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        hasValue: {
            name: 'has value'
        },
        value: {
            if: {arg: 'hasValue', 'eq': true}
        },
        units: {
            if: {arg: 'hasValue', 'eq': true}
        },
        statusText: {name: 'status'},
        statusColor: {name: 'status color'}
    },
    render: render
};
