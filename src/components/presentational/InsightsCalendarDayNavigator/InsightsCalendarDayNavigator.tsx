import React, { CSSProperties, ReactNode, Ref, useContext, useEffect, useState } from 'react';
import { add, min, startOfToday } from 'date-fns';
import { DateRangeContext, DateRangeCoordinator, InsightsCalendar, LayoutContext, Section } from '../../presentational';
import { getDayKey, resolveColor } from '../../../helpers';
import './InsightsCalendarDayNavigator.css';

export interface InsightsCalendarDayNavigatorProps {
    showLegend?: boolean;
    children?: ReactNode;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsCalendarDayNavigator(props: InsightsCalendarDayNavigatorProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);

    const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());

    useEffect(() => {
        const today = startOfToday();

        const intervalStart = dateRangeContext?.intervalStart ?? today;
        if (dateRangeContext?.intervalType === '6Month' || dateRangeContext?.intervalType === 'Month') {
            setSelectedDate(min([today, add(intervalStart, { months: 1, days: -1 })]));
        } else if (dateRangeContext?.intervalType === 'Week') {
            setSelectedDate(min([today, add(intervalStart, { weeks: 1, days: -1 })]));
        } else {
            setSelectedDate(today);
        }
    }, [dateRangeContext?.intervalStart]);

    const colorStyles = {
        '--mdhui-insights-calendar-day-navigator-selected-day-bg-color': resolveColor(layoutContext.colorScheme, { lightMode: '#dedfe3', darkMode: '#5a596a' })
    } as CSSProperties;

    return <div className="mdhui-insights-calendar-day-navigator" style={colorStyles} ref={props.innerRef}>
        <Section noTopMargin>
            <InsightsCalendar showLegend={props.showLegend} onDayClicked={setSelectedDate} selectedDate={selectedDate} />
        </Section>
        <DateRangeCoordinator intervalType="Day" initialIntervalStart={selectedDate} useCustomNavigator={true}>
            {props.children}
        </DateRangeCoordinator>
    </div>;
}
