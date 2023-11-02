import React from 'react';
import './RotatingText.css'
import { differenceInDays, differenceInMonths, differenceInWeeks, min } from 'date-fns';

export interface RotatingTextEntry {
    title?: string;
    text: string;
}

export type RotatingTextInterval = 'day' | 'week' | 'month';

export interface RotatingTextProps {
    interval?: RotatingTextInterval;
    entryTitlePrefix?: string;
    entries: RotatingTextEntry[];
    startDate: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: RotatingTextProps) {
    if (props.entries.length === 0) {
        return <div ref={props.innerRef}/>;
    }

    let now = new Date();
    let startDate = min([now, props.startDate]);

    let entry: RotatingTextEntry;
    if (props.interval === 'month') {
        entry = props.entries[differenceInMonths(now, startDate) % props.entries.length];
    } else if (props.interval === 'week') {
        entry = props.entries[differenceInWeeks(now, startDate) % props.entries.length];
    } else {
        entry = props.entries[differenceInDays(now, startDate) % props.entries.length];
    }

    return <div className="mdhui-rotating-text" ref={props.innerRef}>
        {entry.title &&
            <div className="mdhui-rotating-text-title">{props.entryTitlePrefix ? `${props.entryTitlePrefix}${entry.title}` : entry.title}</div>
        }
        <div className="mdhui-rotating-text-text">{entry.text}</div>
    </div>;
}