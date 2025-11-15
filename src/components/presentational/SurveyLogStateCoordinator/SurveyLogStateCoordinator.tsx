import React, { createContext } from 'react';
import { SurveyLog } from '../../../helpers';
import { CalendarDayState } from '../index';

export interface SurveyLogStateContext {
    computeStatesForDay: (date: Date, surveyLog?: SurveyLog) => CalendarDayState[];
}

export const SurveyLogStateContext = createContext<SurveyLogStateContext | null>(null);

export interface SurveyLogStateCoordinatorProps {
    computeStatesForDay: (date: Date, surveyLog?: SurveyLog) => CalendarDayState[];
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogStateCoordinator(props: SurveyLogStateCoordinatorProps) {
    return <div ref={props.innerRef}>
        <SurveyLogStateContext.Provider value={{ computeStatesForDay: props.computeStatesForDay }}>
            {props.children}
        </SurveyLogStateContext.Provider>
    </div>;
}