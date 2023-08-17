import React, { useState } from "react";
import { createContext } from "react";
import DateRangeNavigator from "../DateRangeNavigator/DateRangeNavigator";
import { add } from "date-fns";

export interface DateRangeCoordinatorProps {
    intervalType: "Week" | "Month";
    weekStartsOn?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "7DaysAgo" | "8DaysAgo";
    variant?: "default" | "rounded";
    children: React.ReactNode;
}

export interface DateRangeContext {
    intervalType: "Week" | "Month";
    intervalStart: Date;
}

var currentDate = new Date();

export const DateRangeContext = createContext<DateRangeContext>({ intervalStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0), intervalType: "Month" });

export default function DateRangeNavigatorContext(props: DateRangeCoordinatorProps) {
    var currentDate = new Date();
    var initialIntervalStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0);
    if (props.intervalType === "Week") {
        var initialIntervalStart = currentDate;
        while (initialIntervalStart.getDay() != 0) {
            initialIntervalStart = add(initialIntervalStart, { days: -1 });
        }
    }

    const [intervalStart, setIntervalStart] = useState(initialIntervalStart);

    let context: DateRangeContext = {
        intervalStart: intervalStart,
        intervalType: props.intervalType
    }

    return <DateRangeContext.Provider value={context}>
        <DateRangeNavigator
            intervalType={props.intervalType}
            intervalStart={intervalStart}
            onIntervalChange={(d) => setIntervalStart(d)}
            variant={props.variant} />
        {props.children}
    </DateRangeContext.Provider>
}