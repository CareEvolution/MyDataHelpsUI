import React, { createContext, useContext, useMemo, useState } from 'react';
import { getDayKey, loadSurveyLogs, SurveyLog, useInitializeView } from '../../../helpers';
import { DateRangeContext } from '../../presentational';
import { add, startOfToday } from 'date-fns';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface SurveyLogContext {
    surveyName: string;
    loading: boolean;
    firstTimeLoading: boolean;
    surveyLogs: Partial<Record<string, SurveyLog>>;
    enterSurveyLog: (date: Date) => void;
}

export const SurveyLogContext = createContext<SurveyLogContext | null>(null);

export interface SurveyLogCoordinatorProps {
    previewState?: 'loading' | 'loaded' | 'reloading';
    surveyName: string;
    dailyDataTypes: string[];
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogCoordinator(props: SurveyLogCoordinatorProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [firstTimeLoading, setFirstTimeLoading] = useState<boolean>(true);
    const [surveyLogs, setSurveyLogs] = useState<Partial<Record<string, SurveyLog>>>({});

    const intervalStart = useMemo<Date>(
        () => dateRangeContext?.intervalStart ?? startOfToday(),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    const intervalEnd = useMemo<Date>(
        () => {
            if (dateRangeContext?.intervalType === '6Month') {
                return add(intervalStart, { months: 6 });
            }
            if (dateRangeContext?.intervalType === 'Month') {
                return add(intervalStart, { months: 1 });
            }
            if (dateRangeContext?.intervalType === 'Week') {
                return add(intervalStart, { weeks: 1 });
            }
            return add(intervalStart, { days: 1 });
        },
        [intervalStart]
    );

    useInitializeView(() => {
        setLoading(true);
        if (props.previewState) {
            setFirstTimeLoading(true);
            setSurveyLogs({});
            if (props.previewState === 'loading') return;
        }
        loadSurveyLogs(props.surveyName, props.dailyDataTypes, intervalStart, intervalEnd, !!props.previewState).then(surveyLogs => {
            setSurveyLogs(surveyLogs);
            setFirstTimeLoading(false);
            if (props.previewState !== 'reloading') {
                setLoading(false);
            }
        });
    }, [], [props.previewState, props.surveyName, props.dailyDataTypes, intervalStart, intervalEnd]);

    const enterSurveyLog = (date: Date) => {
        if (props.previewState || loading) return;
        setLoading(true);
        MyDataHelps.startSurvey(props.surveyName, { event: getDayKey(date) });
    };

    return <div ref={props.innerRef}>
        <SurveyLogContext.Provider value={{ surveyName: props.surveyName, loading, firstTimeLoading, surveyLogs, enterSurveyLog }}>
            {props.children}
        </SurveyLogContext.Provider>
    </div>;
}