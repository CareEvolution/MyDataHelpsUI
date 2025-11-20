import React, { createContext, ReactNode, Ref } from 'react';
import { InsightsData } from '../../../helpers';
import { CalendarDayState, CalendarDayStates } from '../index';

export interface InsightsStateContext {
    computeStatesForDay: (date: Date, insightsData: InsightsData | undefined) => CalendarDayStates;
    multiStateStartAngle?: number;
    legend?: CalendarDayState[];
}

export const InsightsStateContext = createContext<InsightsStateContext | null>(null);

export interface InsightStateCoordinatorProps {
    computeStatesForDay: (date: Date, insightData: InsightsData | undefined) => CalendarDayStates;
    multiStateStartAngle?: number;
    legend?: CalendarDayState[];
    children: ReactNode;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsStateCoordinator(props: InsightStateCoordinatorProps) {
    return <div ref={props.innerRef}>
        <InsightsStateContext.Provider
            value={{
                computeStatesForDay: props.computeStatesForDay,
                multiStateStartAngle: props.multiStateStartAngle,
                legend: props.legend
            }}
            children={props.children}
        />
    </div>;
}