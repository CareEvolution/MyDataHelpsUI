import React, { CSSProperties, useContext } from 'react';
import './BasicCalendar.css';
import { add, startOfMonth } from 'date-fns';
import { Calendar, DateRangeContext, LayoutContext } from '../index';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';

export interface BasicCalendarDayState {
    identifier: string;
    style?: CSSProperties;
    streakColor?: ColorDefinition;
}

export interface BasicCalendarProps {
    intervalStart?: Date;
    computeDayState: (date: Date) => BasicCalendarDayState;
    onDayClicked: (date: Date) => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: BasicCalendarProps) {
    let layoutContext = useContext(LayoutContext);
    let dateRangeContext = useContext(DateRangeContext);

    const getLastDayOfMonth = (date: Date): number => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    const renderDay = (year: number, month: number, day?: number): React.JSX.Element => {
        if (!day) {
            return <div/>;
        }

        let date = new Date(year, month, day);

        let previousDayState = props.computeDayState(add(new Date(date), {days: -1}));
        let currentDayState = props.computeDayState(date);
        let nextDayState = props.computeDayState(add(new Date(date), {days: 1}));

        let dayClasses = ['mdhui-basic-calendar-day'];
        if (currentDayState?.streakColor) {
            if (currentDayState.identifier === previousDayState.identifier && currentDayState.identifier === nextDayState.identifier) {
                if (date.getDate() > 1 && date.getDay() > 0 && date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
                    dayClasses.push(`mdhui-basic-calendar-day-streak-both`);
                } else if (date.getDate() > 1 && date.getDay() > 0) {
                    dayClasses.push(`mdhui-basic-calendar-day-streak-left`);
                } else if (date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
                    dayClasses.push(`mdhui-basic-calendar-day-streak-right`);
                }
            } else if (currentDayState.identifier === previousDayState.identifier && date.getDate() > 1 && date.getDay() > 0) {
                dayClasses.push(`mdhui-basic-calendar-day-streak-left`);
            } else if (currentDayState.identifier === nextDayState.identifier && date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
                dayClasses.push(`mdhui-basic-calendar-day-streak-right`);
            }
        }

        let dayStyle = {'--mdhui-basic-calendar-streak-color': resolveColor(layoutContext.colorScheme, currentDayState?.streakColor)} as CSSProperties;

        return <div className={dayClasses.join(' ')} style={dayStyle} onClick={() => props.onDayClicked(date)}>
            <div className="mdhui-basic-calendar-day-value" style={currentDayState?.style}>{date.getDate()}</div>
        </div>;
    };

    let intervalStart = dateRangeContext?.intervalStart ?? props.intervalStart ?? startOfMonth(new Date());

    return <Calendar className="mdhui-basic-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay}/>;
}