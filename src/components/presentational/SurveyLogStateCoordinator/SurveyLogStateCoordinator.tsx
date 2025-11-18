import React, { createContext } from 'react';
import { SurveyLog } from '../../../helpers';
import { CalendarDayState, CalendarDayStates } from '../index';

export interface SurveyLogStateContext {
    computeStatesForDay: (date: Date, surveyLog: SurveyLog | undefined) => CalendarDayStates;
    multiStateStartAngle?: number;
    legend?: CalendarDayState[];
}

export const SurveyLogStateContext = createContext<SurveyLogStateContext | null>(null);

export interface SurveyLogStateCoordinatorProps {
    computeStatesForDay: (date: Date, surveyLog: SurveyLog | undefined) => CalendarDayStates;
    multiStateStartAngle?: number;
    legend?: CalendarDayState[];
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogStateCoordinator(props: SurveyLogStateCoordinatorProps) {
    return <div ref={props.innerRef}>
        <SurveyLogStateContext.Provider
            value={{
                computeStatesForDay: props.computeStatesForDay,
                multiStateStartAngle: props.multiStateStartAngle,
                legend: props.legend
            }}
            children={props.children}
        />
    </div>;
}