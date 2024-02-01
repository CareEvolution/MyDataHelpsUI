import React from 'react';
import DataSummary, { DataSummaryProps } from './DataSummary';
import { Card, Layout } from '..';
import { noop } from '../../../helpers/functions';

export default {
    title: 'Presentational/DataSummary',
    component: DataSummary,
    parameters: {layout: 'fullscreen'}
};

interface DataSummaryStoryProps extends DataSummaryProps {
    clickable: boolean;
}

const render = (args: DataSummaryStoryProps) => {
    return <Layout colorScheme="auto">
        <Card style={{padding: '16px'}}>
            <DataSummary {...args} onClick={args.clickable ? noop : undefined}/>
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        hasValue: true,
        value: 64,
        units: 'BPM',
        label: 'Resting HR (Day)',
        statusText: 'In range',
        statusColor: '#188A83',
        clickable: false
    },
    argTypes: {
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
