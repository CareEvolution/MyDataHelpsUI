import React, { useEffect, useState } from "react";
import { createContext } from "react";
import DateRangeNavigator from "../DateRangeNavigator/DateRangeNavigator";
import { WeekStartsOn, getMonthStart, getWeekStart } from "../../../helpers/get-interval-start";

export interface DateRangeCoordinatorProps {
    intervalType: "Week" | "Month";
    weekStartsOn?: WeekStartsOn;
    variant?: "default" | "rounded";
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
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

    const [currentContext, setCurrentContext] = useState<DateRangeContext>({
        intervalStart: initialIntervalStart,
        intervalType: props.intervalType
    });

    //reset the interval if the interval type changes
    useEffect(() => {
        setCurrentContext({ intervalType: props.intervalType, intervalStart: initialIntervalStart });
    }, [props.intervalType, props.weekStartsOn]);

    return <div ref={props.innerRef}> <DateRangeContext.Provider value={currentContext}>
        <DateRangeNavigator
            intervalType={props.intervalType}
            intervalStart={currentContext.intervalStart}
            onIntervalChange={(d) => setCurrentContext({ ...currentContext, intervalStart: d })}
            variant={props.variant} />
        {props.children}
    </DateRangeContext.Provider>
    </div>
}