import React, { createContext, useEffect, useState } from "react";
import DateRangeNavigator from "../DateRangeNavigator/DateRangeNavigator";
import { getMonthStart, getWeekStart, WeekStartsOn } from "../../../helpers";
import { startOfToday } from "date-fns";

export interface DateRangeCoordinatorProps {
    initialIntervalStart?: Date;
    intervalType: "Day" | "Week" | "Month" | "6Month";
    weekStartsOn?: WeekStartsOn;
    variant?: "default" | "rounded";
    children?: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
    sticky?: boolean;
    useCustomNavigator?: boolean;
}

export interface DateRangeContextUpdates {
    intervalStart: Date;
}

export interface DateRangeContext {
    intervalType: "Day" | "Week" | "Month" | "6Month";
    intervalStart: Date;
    update: (updates: DateRangeContextUpdates) => void;
}

export const DateRangeContext = createContext<DateRangeContext | null>(null);

export default function DateRangeCoordinator(props: DateRangeCoordinatorProps) {

    const [intervalStart, setIntervalStart] = useState<Date>();

    useEffect(() => {
        // We can't use the existing helper in get-interval-start because this component works
        // differently in the "day" and "6 month" cases.
        const getDefaultIntervalStart = (): Date => {
            if (props.intervalType === "Day") {
                return startOfToday();
            }
            if (props.intervalType === "Week") {
                return getWeekStart(props.weekStartsOn);
            }
            return getMonthStart();
        };
        setIntervalStart(props.initialIntervalStart ?? getDefaultIntervalStart());
    }, [props.initialIntervalStart, props.intervalType, props.weekStartsOn]);

    if (!intervalStart) return null;

    const update = (updates: DateRangeContextUpdates): void => {
        setIntervalStart(updates.intervalStart);
    };

    return <div ref={props.innerRef}>
        <DateRangeContext.Provider value={({ intervalStart, intervalType: props.intervalType, update })}>
            {!props.useCustomNavigator &&
                <DateRangeNavigator
                    sticky={props.sticky}
                    intervalType={props.intervalType}
                    intervalStart={intervalStart}
                    onIntervalChange={setIntervalStart}
                    variant={props.variant}
                />
            }
            {props.children}
        </DateRangeContext.Provider>
    </div>;
}