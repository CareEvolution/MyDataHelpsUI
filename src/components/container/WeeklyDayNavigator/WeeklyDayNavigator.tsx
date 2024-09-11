import React, { DependencyList, useState } from 'react';
import { WeekCalendar } from '../../presentational';
import { add, isSameDay, startOfDay, startOfToday } from 'date-fns';
import { useInitializeView } from '../../../helpers';
import getDayKey from '../../../helpers/get-day-key';

export interface GenericDayNavigatorProps {
    selectedDate: Date;
    onDateSelected: (date: Date) => void;
    loadData: (startDate: Date, endDate: Date) => void;
    dayRenderer: (dayKey: string) => React.JSX.Element | null;
    loading: boolean;
    dependencies?: DependencyList;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: GenericDayNavigatorProps) {
    let [today, setToday] = useState<Date>(startOfToday());
    let [weekStart, setWeekStart] = useState<Date>(add(startOfDay(new Date()), { days: -6 }));

    useInitializeView(() => {
        // Ensure we reload when the time passes midnight.
        if (!isSameDay(today, startOfToday())) {
            setToday(startOfToday());
            setWeekStart(add(startOfToday(), { days: -6 }));
            return;
        }
        props.loadData(add(weekStart, { days: -7 }), add(weekStart, { days: 14 }));
    }, ['externalAccountSyncComplete'], [weekStart, ...(props.dependencies ?? [])]);

    const onStartDateChanged = (startDate: Date) => {
        setWeekStart(startDate);
        props.onDateSelected(add(startDate, { days: 6 }));
    };

    return <WeekCalendar
        innerRef={props.innerRef}
        startDate={weekStart}
        onStartDateChange={onStartDateChanged}
        selectedDate={props.selectedDate}
        onDateSelected={props.onDateSelected}
        dayRenderer={(year: number, month: number, day: number) => props.dayRenderer(getDayKey(new Date(year, month, day)))}
        loading={props.loading}
    />
}