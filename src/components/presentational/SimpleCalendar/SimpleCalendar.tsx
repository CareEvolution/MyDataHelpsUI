import React, { CSSProperties, useContext } from 'react';
import './SimpleCalendar.css';
import { add, startOfMonth } from 'date-fns';
import { Calendar, DateRangeContext, LayoutContext } from '../../presentational';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';

export type SimpleCalendarStateConfiguration = Record<string, { style?: CSSProperties, streak?: boolean, streakColor?: ColorDefinition }>;

export interface SimpleCalendarProps {
    intervalStart?: Date;
    stateConfiguration: SimpleCalendarStateConfiguration;
    computeStateForDay: (date: Date) => string;
    onDayClicked: (date: Date) => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SimpleCalendarProps) {
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

        let previousDayState = props.computeStateForDay(add(new Date(date), {days: -1}));
        let currentDayState = props.computeStateForDay(date);
        let nextDayState = props.computeStateForDay(add(new Date(date), {days: 1}));

        let currentDayStateConfiguration = props.stateConfiguration[currentDayState];

        let dayClasses = ['mdhui-simple-calendar-day'];
        let dayStyle: CSSProperties | undefined;
        if (currentDayStateConfiguration?.streak) {
            if (currentDayState === previousDayState && currentDayState === nextDayState) {
                if (date.getDate() > 1 && date.getDay() > 0 && date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
                    dayClasses.push('mdhui-simple-calendar-day-streak-both');
                } else if (date.getDate() > 1 && date.getDay() > 0) {
                    dayClasses.push('mdhui-simple-calendar-day-streak-left');
                } else if (date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
                    dayClasses.push('mdhui-simple-calendar-day-streak-right');
                }
            } else if (currentDayState === previousDayState && date.getDate() > 1 && date.getDay() > 0) {
                dayClasses.push('mdhui-simple-calendar-day-streak-left');
            } else if (currentDayState === nextDayState && date.getDay() < 6 && date.getDate() < getLastDayOfMonth(date)) {
                dayClasses.push('mdhui-simple-calendar-day-streak-right');
            }

            if (currentDayStateConfiguration?.streakColor) {
                dayStyle = {'--mdhui-simple-calendar-streak-color': resolveColor(layoutContext.colorScheme, currentDayStateConfiguration?.streakColor)} as CSSProperties
            }
        }

        return <div className={dayClasses.join(' ')} style={dayStyle} onClick={() => props.onDayClicked(date)}>
            <div className="mdhui-simple-calendar-day-value" style={currentDayStateConfiguration?.style}>{date.getDate()}</div>
        </div>;
    };

    let intervalStart = dateRangeContext?.intervalStart ?? props.intervalStart ?? startOfMonth(new Date());

    return <Calendar className="mdhui-simple-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay}/>;
}