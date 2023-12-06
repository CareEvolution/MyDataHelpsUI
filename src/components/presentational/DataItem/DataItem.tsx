import React, { useContext } from 'react';
import './DataItem.css';
import { DataContext, DataStatus } from '../DataCoordinator';
import { TextBlock } from "../index";

export interface DataItemProps {
    dataKey: string;
    availableDataKeys: string[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: DataItemProps) {
    const dataContext = useContext(DataContext);
    if (!dataContext) {
        return <TextBlock innerRef={props.innerRef}>Error: DataItems can only be used within a DataCoordinator.</TextBlock>
    }

    if (!dataContext || !dataContext.data || !dataContext.data[props.dataKey]) {
        return <div ref={props.innerRef}/>
    }

    let data = dataContext.data[props.dataKey];

    const getDataStatusText = (status: DataStatus): string => {
        if (status === 'offline') return 'Offline';
        if (status === 'in-range') return 'In range';
        if (status === 'out-of-range') return 'Out of range';
        return 'Establishing';
    };

    return <div className="mdhui-data-item" ref={props.innerRef}>
        <div className="mdhui-data-item-value-units">
            {data.value &&
                <div className="mdhui-data-item-value">{data.value.toLocaleString()}</div>
            }
            {data.value && data.units &&
                <div className="mdhui-data-item-units">{data.units}</div>
            }
        </div>
        <div className="mdhui-data-item-label">{data.label}</div>
        <div className={`mdhui-data-item-status mdhui-data-item-status-${data.status}`}>{data.statusText ?? getDataStatusText(data.status)}</div>
    </div>;
}