import React, { createContext, ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import DateRangeNavigator from "../DateRangeNavigator/DateRangeNavigator";
import { getMonthStart, getWeekStart, WeekStartsOn } from "../../../helpers";
import { startOfDay } from "date-fns";

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

export interface DateRangeContextUpdater {
    update: (updates: DateRangeContextUpdates) => void;
}

export const DateRangeContext = createContext<DateRangeContext | null>(null);

const DateRangeCoordinator = forwardRef<DateRangeContextUpdater | undefined, DateRangeCoordinatorProps>((props: DateRangeCoordinatorProps, ref: ForwardedRef<DateRangeContextUpdater | undefined>) => {

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
    const currentContextRef = useRef<DateRangeContext | null>();

    currentContextRef.current = currentContext;

    const update = (updates: DateRangeContextUpdates) => {
        setCurrentContext({ ...currentContextRef.current!, ...updates } as DateRangeContext);
    };

    useEffect(() => {
        setCurrentContext({ intervalType: props.intervalType, intervalStart: initialIntervalStart, update });
    }, [props.intervalType, props.weekStartsOn]);

    useImperativeHandle(ref, () => ({ update }));

    if (!currentContext) return null;

    return <div ref={props.innerRef}><DateRangeContext.Provider value={currentContext}>
        {!props.useCustomNavigator &&
            <DateRangeNavigator
                sticky={props.sticky}
                intervalType={props.intervalType}
                intervalStart={currentContext.intervalStart}
                onIntervalChange={(d) => setCurrentContext({ ...currentContext, intervalStart: d })}
                variant={props.variant}
            />
        }
        {props.children}
    </DateRangeContext.Provider>
    </div>;
});

export default DateRangeCoordinator;