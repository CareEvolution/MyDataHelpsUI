import { add } from 'date-fns';
import React, { createContext, useState } from 'react';
import { loadSurveyAnswerLogs, SurveyAnswerLog, useInitializeView } from '../../../helpers';
import { generateSurveyAnswerLogs, SurveyAnswerLogCoordinatorPreviewState } from './SurveyAnswerLogCoordinator.previewData';

export interface SurveyAnswerLogContext {
    surveyName: string;
    loading: boolean;
    surveyAnswerLogs: Partial<Record<string, SurveyAnswerLog>>;
}

export const SurveyAnswerLogContext = createContext<SurveyAnswerLogContext | null>(null);

export interface SurveyAnswerLogCoordinatorProps {
    previewState?: 'loading' | SurveyAnswerLogCoordinatorPreviewState;
    surveyName: string;
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogCoordinator(props: SurveyAnswerLogCoordinatorProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [surveyAnswerLogs, setSurveyAnswerLogs] = useState<Partial<Record<string, SurveyAnswerLog>>>({});

    const reset = () => {
        setLoading(true);
        setSurveyAnswerLogs({});
    };

    const applyPreviewState = (previewState: 'loading' | SurveyAnswerLogCoordinatorPreviewState) => {
        if (previewState === 'loading') return;
        generateSurveyAnswerLogs(previewState, add(new Date(), { months: -3 })).then(surveyAnswerLogs => {
            setSurveyAnswerLogs(surveyAnswerLogs);
            setLoading(false);
        });
    };

    const loadState = () => {
        loadSurveyAnswerLogs(props.surveyName).then(surveyAnswerLogs => {
            setSurveyAnswerLogs(surveyAnswerLogs);
            setLoading(false);
        });
    };

    useInitializeView(() => {
        reset();
        if (props.previewState) {
            applyPreviewState(props.previewState);
            return;
        }
        loadState();
    }, [], [props.previewState, props.surveyName]);

    return <div ref={props.innerRef}>
        <SurveyAnswerLogContext.Provider value={{ surveyName: props.surveyName, loading, surveyAnswerLogs }}>
            {props.children}
        </SurveyAnswerLogContext.Provider>
    </div>;
}