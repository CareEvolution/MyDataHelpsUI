import React from 'react';
import './ColumnPanel.css';

export interface ColumnPanelProps {
    columns: number;
    children: React.ReactNode;
    padding?: string | number;
    columnGap?: string | number;
    rowGap?: string | number;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: ColumnPanelProps) {
    let templateColumns = '';
    for (let x = 0; x < props.columns; x++) {
        if (templateColumns.length > 0) {
            templateColumns += ' ';
        }
        templateColumns += '1fr';
    }
    let style = {
        gridTemplateColumns: templateColumns,
        gridColumnGap: props.columnGap ?? 0,
        gridRowGap: props.rowGap ?? 0,
        padding: props.padding ?? 0
    };
    return <div className="mdhui-column-panel" ref={props.innerRef} style={style}>
        {props.children}
    </div>;
}