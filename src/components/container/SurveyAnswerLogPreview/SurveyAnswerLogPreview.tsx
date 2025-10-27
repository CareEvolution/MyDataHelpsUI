import React, { useContext, useMemo, useState } from 'react';
import { Action, Card, DateRangeContext, SurveyAnswerLogSummary } from '../../presentational';
import { startOfDay } from 'date-fns';
import { enterSurveyAnswerLog, getDayKey, loadSurveyAnswerLog, SurveyAnswerLog, SurveyAnswerRenderingConfiguration, useInitializeView } from '../../../helpers';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createPreviewAnswerRenderingConfigurations, generateSurveyAnswerLog, SurveyAnswerLogPreviewPreviewState } from './SurveyAnswerLogPreview.previewData';

export interface SurveyAnswerLogPreviewProps {
    previewState?: SurveyAnswerLogPreviewPreviewState;
    surveyName: string;
    answerRenderingConfigurations?: SurveyAnswerRenderingConfiguration[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogPreview(props: SurveyAnswerLogPreviewProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [surveyAnswerLog, setSurveyAnswerLog] = useState<SurveyAnswerLog>();

    const currentDate = useMemo<Date>(
        () => startOfDay(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    useInitializeView(() => {
        setLoading(true);

        const load = props.previewState
            ? () => generateSurveyAnswerLog(props.previewState!, currentDate)
            : () => loadSurveyAnswerLog(props.surveyName, currentDate);

        load().then(surveyAnswerLog => {
            setSurveyAnswerLog(surveyAnswerLog);
            setLoading(false);
        });
    }, [], [props.previewState, props.surveyName, currentDate]);

    if (loading) return null;

    const onEnterLog = (): void => {
        if (props.previewState) return;
        enterSurveyAnswerLog(props.surveyName, currentDate);
    };

    return <div className="mdhui-sa-log-preview" ref={props.innerRef}>
        {!surveyAnswerLog &&
            <Card variant="highlight">
                <Action
                    title="Add Log"
                    onClick={onEnterLog}
                    indicatorIcon={faPlus}
                />
            </Card>
        }
        {surveyAnswerLog &&
            <Card>
                <SurveyAnswerLogSummary
                    log={surveyAnswerLog}
                    onEdit={onEnterLog}
                    answerRenderingConfigurations={props.previewState ? createPreviewAnswerRenderingConfigurations() : props.answerRenderingConfigurations}
                />
            </Card>
        }
    </div>;
}