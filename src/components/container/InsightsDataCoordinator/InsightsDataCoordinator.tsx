import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getDayKey, InsightsData, InsightsDataPreviewState, loadInsightsData, useInitializeView } from '../../../helpers';
import { DateRangeContext } from '../../presentational';
import { add, startOfToday } from 'date-fns';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface InsightsDataContext {
    logSurveyName?: string;
    loading: boolean;
    firstTimeLoading: boolean;
    insightsData: Partial<Record<string, InsightsData>>;
    enterSurveyLog: (date: Date) => void;
}

export const InsightsDataContext = createContext<InsightsDataContext | null>(null);

export interface InsightsDataCoordinatorProps {
    previewState?: 'loading' | InsightsDataPreviewState;
    logSurveyName?: string;
    otherSurveyNames?: string[];
    dailyDataTypes?: string[];
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function InsightsDataCoordinator(props: InsightsDataCoordinatorProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [firstTimeLoading, setFirstTimeLoading] = useState<boolean>(true);
    const [insightsData, setInsightsData] = useState<Partial<Record<string, InsightsData>>>({});

    const latestRequestId = useRef<number>(0);

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

    useEffect(() => {
        setInsightsData({});
    }, [intervalStart]);

    useInitializeView(() => {
        setLoading(true);
        if (props.previewState) {
            setFirstTimeLoading(true);
            setInsightsData({});
            if (props.previewState === 'loading') return;
        }

        const surveyNames: string[] = [...new Set(props.otherSurveyNames)];
        if (props.logSurveyName && !surveyNames.includes(props.logSurveyName)) {
            surveyNames.push(props.logSurveyName);
        }
        const dailyDataTypes = [...new Set(props.dailyDataTypes)];

        const requestId = ++latestRequestId.current;
        loadInsightsData(surveyNames, dailyDataTypes, intervalStart, intervalEnd, props.previewState).then(insightData => {
            if (requestId !== latestRequestId.current) return;
            setInsightsData(insightData);
            setFirstTimeLoading(false);
            if (!props.previewState?.startsWith('reloading')) {
                setLoading(false);
            }
        });
    }, [], [props.previewState, props.logSurveyName, props.otherSurveyNames, props.dailyDataTypes, intervalStart, intervalEnd]);

    const enterSurveyLog = (date: Date) => {
        if (props.previewState || loading || !props.logSurveyName) return;
        setLoading(true);
        MyDataHelps.startSurvey(props.logSurveyName, { event: getDayKey(date) });
    };

    return <div ref={props.innerRef}>
        <InsightsDataContext.Provider
            value={{ logSurveyName: props.logSurveyName, loading, firstTimeLoading, insightsData, enterSurveyLog }}
            children={props.children}
        />
    </div>;
}