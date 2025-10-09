import React, { DependencyList, useContext, useState } from 'react';
import { DateRangeContext, WeekCalendar } from '../../presentational';
import { add, isSameDay, startOfToday } from 'date-fns';
import { useInitializeView } from '../../../helpers';
import getDayKey from '../../../helpers/get-day-key';

export interface WeeklyDayNavigatorProps {
    minimumDate?: Date;
    selectedDate: Date;
    loadData: (startDate: Date, endDate: Date) => Promise<void>;
    dayRenderer: (dayKey: string) => React.JSX.Element | null;
    dependencies?: DependencyList;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: WeeklyDayNavigatorProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [today, setToday] = useState<Date>(startOfToday());
    const [weekStart, setWeekStart] = useState<Date>(add(startOfToday(), { days: -6 }));
    const [loading, setLoading] = useState<boolean>(true);

    useInitializeView(() => {
        // Ensure we reload when the time passes midnight.
        if (!isSameDay(today, startOfToday())) {
            setToday(startOfToday());
            setWeekStart(add(startOfToday(), { days: -6 }));
            return;
        }

        setLoading(true);

        let startDate = add(weekStart, { days: -7 });
        if ( props.minimumDate && startDate < props.minimumDate ){
            startDate = props.minimumDate;
        }

        props.loadData(startDate, add(weekStart, { days: 14 })).then(() => {
            setLoading(false);
        });
    }, ['externalAccountSyncComplete'], [weekStart, ...(props.dependencies ?? [])]);

    const onDateSelected = (date: Date) => {
        dateRangeContext?.update({ intervalStart: date });
    };

    const onStartDateChanged = (startDate: Date) => {
        setWeekStart(startDate);
        onDateSelected(add(startDate, { days: 6 }));
    };

    return <WeekCalendar
        innerRef={props.innerRef}
        minimumDate={props.minimumDate}
        startDate={weekStart}
        onStartDateChange={onStartDateChanged}
        selectedDate={props.selectedDate}
        onDateSelected={onDateSelected}
        dayRenderer={(year: number, month: number, day: number) => props.dayRenderer(getDayKey(new Date(year, month, day)))}
        loading={loading}
    />
}