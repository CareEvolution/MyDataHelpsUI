import React, { useEffect, useState } from "react";
import { createContext } from "react";
import DateRangeNavigator from "../DateRangeNavigator/DateRangeNavigator";
import { WeekStartsOn, getMonthStart, getWeekStart } from "../../../helpers/get-interval-start";

export interface DateRangeCoordinatorProps {
    intervalType: "Week" | "Month";
    weekStartsOn?: WeekStartsOn;
    variant?: "default" | "rounded";
    children: React.ReactNode;
}

export interface DateRangeContext {
    intervalType: "Week" | "Month";
    intervalStart: Date;
}

export const DateRangeContext = createContext<DateRangeContext | null>(null);

export default function DateRangeNavigatorContext(props: DateRangeCoordinatorProps) {
    let initialIntervalStart = getMonthStart();
    if (props.intervalType === "Week") {
        initialIntervalStart = getWeekStart(props.weekStartsOn);
    }

    const [intervalStart, setIntervalStart] = useState(initialIntervalStart);

    let context: DateRangeContext = {
        intervalStart: intervalStart,
        intervalType: props.intervalType
    }

    //reset the interval if the interval type changes
    useEffect(() => {
        setIntervalStart(initialIntervalStart);
    }, [props.intervalType, props.weekStartsOn]);

    return <DateRangeContext.Provider value={context}>
        <DateRangeNavigator
            intervalType={props.intervalType}
            intervalStart={intervalStart}
            onIntervalChange={(d) => setIntervalStart(d)}
            variant={props.variant} />
        {props.children}
    </DateRangeContext.Provider>
}