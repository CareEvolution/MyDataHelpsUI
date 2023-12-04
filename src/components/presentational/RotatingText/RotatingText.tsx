import React from 'react';
import './RotatingText.css'
import { differenceInDays, differenceInWeeks } from 'date-fns';

export interface RotatingTextEntry {
    title?: string;
    text: string;
}

export type RotatingTextInterval = 'day' | 'week' | 'month';

export interface RotatingTextProps {
    interval?: RotatingTextInterval;
    entryTitlePrefix?: string;
    entries: RotatingTextEntry[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: RotatingTextProps) {
    let now = new Date();
    let startOfYear = new Date(now.getFullYear(), 0, 1);

    let entry: RotatingTextEntry;
    if (props.interval === 'month') {
        entry = props.entries[now.getMonth() % props.entries.length];
    } else if (props.interval === 'week') {
        entry = props.entries[differenceInWeeks(now, startOfYear) % props.entries.length];
    } else {
        entry = props.entries[differenceInDays(now, startOfYear) % props.entries.length];
    }

    return <div className="mdhui-rotating-text" ref={props.innerRef}>
        {entry.title &&
            <div className="mdhui-rotating-text-title">{props.entryTitlePrefix ? `${props.entryTitlePrefix}${entry.title}` : entry.title}</div>
        }
        <div className="mdhui-rotating-text-text">{entry.text}</div>
    </div>;
}