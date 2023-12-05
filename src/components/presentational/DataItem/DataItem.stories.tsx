import React from 'react';
import DataItem from './DataItem';
import { Data, DataCoordinator, Layout } from '../../presentational';

export default {
    title: 'Presentational/DataItem',
    component: DataItem,
    parameters: {layout: 'fullscreen'}
};

interface DataItemStoryProps {
    data: Record<string, Data>;
    dataKey: string;
}

const render = (args: DataItemStoryProps) => {
    const loadData = (): Promise<Record<string, Data>> => {
        return new Promise(resolve => {
            resolve(args.data);
        })
    };

    return <Layout colorScheme="auto" bodyBackgroundColor="#fff">
        <DataCoordinator loadData={loadData}>
            <DataItem dataKey={args.dataKey}/>
        </DataCoordinator>
    </Layout>
};

export const Establishing = {
    args: {
        data: {
            'rhr': {
                label: 'Resting HR',
                value: 64,
                units: 'BPM',
                status: 'establishing'
            }
        },
        dataKey: 'rhr'
    },
    render: render
};

export const Offline = {
    args: {
        data: {
            'rhr': {
                label: 'Resting HR (Day)',
                value: 64,
                units: 'BPM',
                status: 'offline'
            }
        },
        dataKey: 'rhr'
    },
    render: render
};

export const InRange = {
    args: {
        data: {
            'rhr': {
                label: 'Resting HR (Day)',
                value: 64,
                units: 'BPM',
                status: 'in-range'
            }
        },
        dataKey: 'rhr'
    },
    render: render
};

export const OutOfRange = {
    args: {
        data: {
            'rhr': {
                label: 'Resting HR (Day)',
                value: 64,
                units: 'BPM',
                status: 'out-of-range'
            }
        },
        dataKey: 'rhr'
    },
    render: render
};

export const NoUnits = {
    args: {
        data: {
            'steps': {
                label: 'Steps',
                value: 4550,
                status: 'in-range'
            }
        },
        dataKey: 'steps'
    },
    render: render
};

export const NoValue = {
    args: {
        data: {
            'haqi': {
                label: 'AQI (Home)',
                status: 'establishing'
            }
        },
        dataKey: 'haqi'
    },
    render: render
};

export const StatusTextOverride = {
    args: {
        data: {
            'haqi': {
                label: 'AQI (Home)',
                value: 130,
                status: 'out-of-range',
                statusText: 'Unhealthy'
            }
        },
        dataKey: 'haqi'
    },
    render: render
};
