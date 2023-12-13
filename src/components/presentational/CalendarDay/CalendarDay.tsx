import React, { CSSProperties, useContext } from 'react';
import './CalendarDay.css';
import { LayoutContext } from '../Layout';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { add, isAfter, isSameDay } from 'date-fns';

export type CalendarDayStateConfiguration = Record<string, { style?: CSSProperties, streak?: boolean, streakColor?: ColorDefinition }>;

export interface CalendarDayProps {
    year: number;
    month: number;
    day?: number;
    stateConfiguration: CalendarDayStateConfiguration;
    computeStateForDay: (date: Date) => string;
    onClick?: (date: Date) => void;
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

    const canStreakLeft = (date: Date): boolean => {
        let isFirstDayOfMonth = date.getDate() === 1;
        let isFirstDayOfWeek = date.getDay() === 0;
        return !isFirstDayOfMonth && !isFirstDayOfWeek;
    };

    const canStreakRight = (date: Date): boolean => {
        let isLastDayOfMonth = date.getDate() === getLastDayOfMonth(date);
        let isLastDayOfWeek = date.getDay() === 6;
        return !isLastDayOfMonth && !isLastDayOfWeek;
    };

    let date = new Date(props.year, props.month, props.day);

    let previousDayState = props.computeStateForDay(add(new Date(date), {days: -1}));
    let currentDayState = props.computeStateForDay(date);
    let nextDayState = props.computeStateForDay(add(new Date(date), {days: 1}));

    let currentDayStateConfiguration = props.stateConfiguration[currentDayState];

    let dayClasses: string[] = ['mdhui-calendar-day'];
    let dayStyle: CSSProperties | undefined;

    if (isSameDay(date, new Date())) {
        dayClasses.push('mdhui-calendar-day-today');
    } else if (isAfter(date, new Date())) {
        dayClasses.push('mdhui-calendar-day-future');
    }

    if (currentDayStateConfiguration?.streak) {
        if (currentDayState === previousDayState && currentDayState === nextDayState && canStreakLeft(date) && canStreakRight(date)) {
            dayClasses.push('mdhui-calendar-day-streak-both');
        } else if (currentDayState === previousDayState && canStreakLeft(date)) {
            dayClasses.push('mdhui-calendar-day-streak-left');
        } else if (currentDayState === nextDayState && canStreakRight(date)) {
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