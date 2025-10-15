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

export interface DateRangeContext {
    intervalType: "Day" | "Week" | "Month" | "6Month";
    intervalStart: Date;
    update: (newIntervalStart: Date) => void;
}

export const DateRangeContext = createContext<DateRangeContext | null>(null);

export default function(props: DateRangeCoordinatorProps) {

    const [intervalStart, setIntervalStart] = useState<Date>();

    useEffect(() => {
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

    return <div ref={props.innerRef}>
        <DateRangeContext.Provider value={({ intervalStart, intervalType: props.intervalType, update: setIntervalStart })}>
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