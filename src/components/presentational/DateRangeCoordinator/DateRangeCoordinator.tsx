import React, { useEffect, useState } from "react";
import { createContext } from "react";
import DateRangeNavigator from "../DateRangeNavigator/DateRangeNavigator";
import { WeekStartsOn, getMonthStart, getWeekStart } from "../../../helpers/get-interval-start";
import { startOfDay } from "date-fns";

export interface DateRangeCoordinatorProps {
    initialIntervalStart?: Date;
    intervalType: "Day" | "Week" | "Month" | "SixMonth";
    weekStartsOn?: WeekStartsOn;
    variant?: "default" | "rounded";
    children?: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
    sticky?: boolean;
}

export interface DateRangeContext {
    intervalType: "Day" | "Week" | "Month" | "SixMonth";
    intervalStart: Date;
}

export const DateRangeContext = createContext<DateRangeContext | null>(null);

export default function DateRangeNavigatorContext(props: DateRangeCoordinatorProps) {
    let initialIntervalStart = props.initialIntervalStart || getMonthStart();
    if (props.intervalType === "Week") {
        initialIntervalStart = getWeekStart(props.weekStartsOn);
    }
    if (props.intervalType === "Day") {
        initialIntervalStart = startOfDay(new Date());
    }

    //default to null because the initial context will be set in useEffect below
    //otherwise it could cause a double render of child components
    const [currentContext, setCurrentContext] = useState<DateRangeContext | null>(null);

    //reset the interval if the interval type changes
    useEffect(() => {
        setCurrentContext({ intervalType: props.intervalType, intervalStart: initialIntervalStart });
    }, [props.intervalType, props.weekStartsOn]);

    if (!currentContext) { return null; }

    return <div ref={props.innerRef}> <DateRangeContext.Provider value={currentContext}>
        <DateRangeNavigator
            sticky={props.sticky}
            intervalType={props.intervalType}
            intervalStart={currentContext.intervalStart}
            onIntervalChange={(d) => setCurrentContext({ ...currentContext, intervalStart: d })}
            variant={props.variant} />
        {props.children}
    </DateRangeContext.Provider>
    </div>
}