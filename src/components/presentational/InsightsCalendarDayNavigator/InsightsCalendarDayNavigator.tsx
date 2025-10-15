import React, { CSSProperties, ReactNode, Ref, useContext, useEffect, useRef, useState } from 'react';
import { add, min, startOfToday } from 'date-fns';
import { DateRangeContext, DateRangeCoordinator, InsightsCalendar, LayoutContext, Section } from '../../presentational';
import { DateRangeContextUpdater } from '../DateRangeCoordinator/DateRangeCoordinator';
import { resolveColor } from '../../../helpers';
import './InsightsCalendarDayNavigator.css';

export interface InsightsDayCoordinatorProps {
    showLegend?: boolean;
    children?: ReactNode;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsCalendarDayNavigator(props: InsightsDayCoordinatorProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);
    const childContextUpdater = useRef<DateRangeContextUpdater>();

    const [selectedDate, setSelectedDate] = useState<Date>();

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

    useEffect(() => {
        if (selectedDate) {
            childContextUpdater.current?.update({ intervalStart: selectedDate });
        }
    }, [selectedDate]);

    const colorStyles = {
        '--mdhui-insights-calendar-day-navigator-selected-day-bg-color': resolveColor(layoutContext.colorScheme, { lightMode: '#dedfe3', darkMode: '#5a596a' })
    } as CSSProperties;

    return <div className="mdhui-insights-calendar-day-navigator" style={colorStyles} ref={props.innerRef}>
        <Section noTopMargin>
            <InsightsCalendar showLegend={props.showLegend} onDayClicked={setSelectedDate} selectedDate={selectedDate} />
        </Section>
        <DateRangeCoordinator intervalType="Day" useCustomNavigator={true} ref={childContextUpdater}>
            {props.children}
        </DateRangeCoordinator>
    </div>;
}
