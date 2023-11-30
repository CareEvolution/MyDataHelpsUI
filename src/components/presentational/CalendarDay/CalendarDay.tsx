import React, { CSSProperties, useContext } from 'react';
import './CalendarDay.css';
import { LayoutContext } from '../Layout';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { add } from 'date-fns';

export type CalendarDayStateConfiguration = Record<string, { style?: CSSProperties, streak?: boolean, streakColor?: ColorDefinition }>;

export interface CalendarDayProps {
    year: number;
    month: number;
    day?: number;
    stateConfiguration: CalendarDayStateConfiguration;
    computeStateForDay: (date: Date) => string;
    onClick: (date: Date) => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: CalendarDayProps) {
    let layoutContext = useContext(LayoutContext);

    if (!props.day) {
        return <div ref={props.innerRef}/>;
    }

    const getLastDayOfMonth = (date: Date): number => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    let date = new Date(props.year, props.month, props.day);

    let previousDayState = props.computeStateForDay(add(new Date(date), {days: -1}));
    let currentDayState = props.computeStateForDay(date);
    let nextDayState = props.computeStateForDay(add(new Date(date), {days: 1}));

    let currentDayStateConfiguration = props.stateConfiguration[currentDayState];

    let dayClasses = ['mdhui-calendar-day'];
    let dayStyle: CSSProperties | undefined;
    if (currentDayStateConfiguration?.streak) {
        if (currentDayState === previousDayState && currentDayState === nextDayState) {
            if (date.getDate() > 1 && date.getDay() > 0 && date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
                dayClasses.push('mdhui-calendar-day-streak-both');
            } else if (date.getDate() > 1 && date.getDay() > 0) {
                dayClasses.push('mdhui-calendar-day-streak-left');
            } else if (date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
                dayClasses.push('mdhui-calendar-day-streak-right');
            }
        } else if (currentDayState === previousDayState && date.getDate() > 1 && date.getDay() > 0) {
            dayClasses.push('mdhui-calendar-day-streak-left');
        } else if (currentDayState === nextDayState && date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
            dayClasses.push('mdhui-calendar-day-streak-right');
        }
        if (currentDayStateConfiguration?.streakColor) {
            dayStyle = {'--mdhui-calendar-day-streak-color': resolveColor(layoutContext.colorScheme, currentDayStateConfiguration?.streakColor)} as CSSProperties
        }
    }

    return <div ref={props.innerRef} className={dayClasses.join(' ')} style={dayStyle} onClick={() => props.onClick(date)}>
        <div className="mdhui-calendar-day-value" style={currentDayStateConfiguration?.style}>{date.getDate()}</div>
    </div>;
}