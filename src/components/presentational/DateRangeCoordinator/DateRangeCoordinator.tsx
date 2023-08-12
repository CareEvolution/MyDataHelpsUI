import React, { useState } from "react";
import { createContext } from "react";
import DateRangeNavigator from "../DateRangeNavigator/DateRangeNavigator";

export interface DateRangeCoordinatorProps {
    intervalType: "Week" | "Month";
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
    const [intervalStart, setIntervalStart] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0));

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