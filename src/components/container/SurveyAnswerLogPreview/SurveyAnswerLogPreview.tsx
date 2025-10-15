import React, { useContext, useState } from 'react';
import { Action, Button, Card, DateRangeContext, LoadingIndicator, SurveyAnswerLogSummary, SurveyAnswerRenderingConfiguration } from '../../presentational';
import { isSameDay, startOfDay } from 'date-fns';
import { enterSurveyAnswerLog, formatDateForLocale, getDayKey, loadSurveyAnswerLog, SurveyAnswerLog, useInitializeView } from '../../../helpers';
import { generateSurveyAnswerLog, SurveyAnswerLogPreviewPreviewState } from './SurveyAnswerLogPreview.previewData';
import './SurveyAnswerLogPreview.css';

export interface SurveyAnswerLogPreviewProps {
    previewState?: 'loading' | 'reloading without log' | 'reloading with log' | SurveyAnswerLogPreviewPreviewState;
    surveyName: string;
    answerRenderingConfigurations?: SurveyAnswerRenderingConfiguration[];
    alwaysShowAnswerDetails?: boolean;
    showAnswerDetailsOnLoad?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogPreview(props: SurveyAnswerLogPreviewProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [initialized, setInitialized] = useState<boolean>(false);
    const [surveyAnswerLog, setSurveyAnswerLog] = useState<SurveyAnswerLog>();

    const currentDate = startOfDay(dateRangeContext?.intervalStart ?? new Date());

    const applyPreviewState = (previewState: 'loading' | 'reloading without log' | 'reloading with log' | SurveyAnswerLogPreviewPreviewState) => {
        setInitialized(false);
        setSurveyAnswerLog(undefined);
        if (previewState === 'loading') return;
        generateSurveyAnswerLog(previewState.replace('reloading ', '') as SurveyAnswerLogPreviewPreviewState, props.answerRenderingConfigurations, currentDate).then(surveyAnswerLog => {
            setSurveyAnswerLog(surveyAnswerLog);
            setInitialized(true);
            if (!previewState.startsWith('reloading')) {
                setLoading(false);
            }
        });
    };

    const loadState = () => {
        loadSurveyAnswerLog(props.surveyName, currentDate).then(surveyAnswerLog => {
            setSurveyAnswerLog(surveyAnswerLog);
            setInitialized(true);
            setLoading(false);
        });
    };

    useInitializeView(() => {
        setLoading(true);
        if (props.previewState) {
            applyPreviewState(props.previewState);
            return;
        }
        loadState();
    }, [], [props.previewState, props.surveyName, props.answerRenderingConfigurations, dateRangeContext?.intervalStart, getDayKey(new Date())]);

    if (!initialized && loading) return null;

    const onEnterLog = (priorSurveyAnswerLog?: SurveyAnswerLog): void => {
        if (props.previewState) return;
        enterSurveyAnswerLog(props.surveyName, priorSurveyAnswerLog, currentDate);
    };

    return <div className="mdhui-sa-log-preview" ref={props.innerRef}>
        {(!surveyAnswerLog || !props.answerRenderingConfigurations) &&
            <Card>
                <Action
                    title={isSameDay(currentDate, new Date()) ? 'Today\'s Log' : formatDateForLocale(currentDate, 'PPP')}
                    subtitle={surveyAnswerLog ? 'A log has been entered' : 'A log has not been entered.'}
                    renderAs="div"
                    indicator={<Button onClick={() => onEnterLog(surveyAnswerLog)}>{surveyAnswerLog ? 'Edit Log' : 'Add Log'}</Button>}
                />
                {loading &&
                    <div className="mdhui-sa-log-preview-loading-indicator-overlay">
                        <LoadingIndicator className="mdhui-sa-log-preview-loading-indicator" />
                    </div>
                }
            </Card>
        }
        {surveyAnswerLog && props.answerRenderingConfigurations &&
            <Card>
                <SurveyAnswerLogSummary
                    title={isSameDay(surveyAnswerLog.date, new Date()) ? 'Today\'s Log' : undefined}
                    surveyAnswerLog={surveyAnswerLog}
                    onEdit={() => onEnterLog(surveyAnswerLog)}
                    answerRenderingConfigurations={props.answerRenderingConfigurations}
                    alwaysShowAnswerDetails={props.alwaysShowAnswerDetails}
                    showAnswerDetailsOnLoad={props.showAnswerDetailsOnLoad}
                />
                {loading &&
                    <div className="mdhui-sa-log-preview-loading-indicator-overlay">
                        <LoadingIndicator className="mdhui-sa-log-preview-loading-indicator" />
                    </div>
                }
            </Card>
        }
    </div>;
}