import React, { Children } from 'react';
import { differenceInDays, differenceInMonths, differenceInWeeks, min } from 'date-fns';

export type RotatingComponentInterval = 'day' | 'week' | 'month';

export interface RotatingComponentCoordinatorProps {
    interval?: RotatingComponentInterval;
    children: React.ReactNode;
    startDate: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: RotatingComponentCoordinatorProps) {
    let children = Children.toArray(props.children);

    if (children.length === 0) {
        return <div ref={props.innerRef}/>;
    }

    let now = new Date();
    let startDate = min([now, props.startDate]);

    let index: number;
    if (props.interval === 'month') {
        index = differenceInMonths(now, startDate) % children.length;
    } else if (props.interval === 'week') {
        index = differenceInWeeks(now, startDate) % children.length;
    } else {
        index = differenceInDays(now, startDate) % children.length;
    }

    return <div ref={props.innerRef}>
        {children[index]}
    </div>;
}