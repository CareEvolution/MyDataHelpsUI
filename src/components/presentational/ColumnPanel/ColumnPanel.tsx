import React from 'react';
import './ColumnPanel.css';

export interface ColumnPanelProps {
    columns: number;
    children: React.ReactNode;
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
    return <div className="mdhui-column-panel" ref={props.innerRef} style={{gridTemplateColumns: templateColumns}}>
        {props.children}
    </div>;
}