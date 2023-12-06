import React, { createContext, useEffect, useState } from 'react';

export type DataStatus = 'establishing' | 'offline' | 'in-range' | 'out-of-range';

export interface Data {
    label: string;
    status: DataStatus;
    statusText?: string;
    value?: number;
    units?: string;
}

export interface DataCoordinatorProps {
    previewState?: 'default';
    loadData: () => Promise<Record<string, Data>>;
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface DataContext {
    data?: Record<string, Data>;
}

export const DataContext = createContext<DataContext | null>(null);

export default function (props: DataCoordinatorProps) {
    const [currentContext, setCurrentContext] = useState<DataContext>({});

    useEffect(() => {
        if (props.previewState === 'default') {
            setCurrentContext({
                data: {
                    'preview': {
                        label: 'Resting HR',
                        value: 64,
                        units: 'BPM',
                        status: 'in-range'
                    }
                }
            });
            return;
        }
        props.loadData().then(data => {
            setCurrentContext({data: data});
        });
    }, []);

    return <div ref={props.innerRef}>
        <DataContext.Provider value={currentContext}>
            {props.children}
        </DataContext.Provider>
    </div>;
}