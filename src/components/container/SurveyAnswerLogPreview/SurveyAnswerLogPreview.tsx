import React, { useContext, useMemo, useState } from 'react';
import { Action, Button, Card, DateRangeContext, LoadingIndicator, SurveyAnswerLogBadgeConfiguration, SurveyAnswerLogSummary } from '../../presentational';
import { isSameDay, startOfDay } from 'date-fns';
import { enterSurveyAnswerLog, formatDateForLocale, getDayKey, loadSurveyAnswerLog, SurveyAnswerLog, useInitializeView } from '../../../helpers';
import { generateSurveyAnswerLog, SurveyAnswerLogPreviewPreviewState } from './SurveyAnswerLogPreview.previewData';
import './SurveyAnswerLogPreview.css';

export interface SurveyAnswerLogPreviewProps {
    previewState?: 'loading' | 'reloading without log' | 'reloading with log' | SurveyAnswerLogPreviewPreviewState;
    surveyName: string;
    badgeConfigurations?: SurveyAnswerLogBadgeConfiguration[];
    showFirstBadgeDetailsOnLoad?: boolean;
    alwaysShowBadgeDetails?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogPreview(props: SurveyAnswerLogPreviewProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [initialized, setInitialized] = useState<boolean>(false);
    const [surveyAnswerLog, setSurveyAnswerLog] = useState<SurveyAnswerLog>();

    const currentDate = useMemo<Date>(
        () => startOfDay(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    const applyPreviewState = (previewState: 'loading' | 'reloading without log' | 'reloading with log' | SurveyAnswerLogPreviewPreviewState) => {
        setInitialized(false);
        setSurveyAnswerLog(undefined);
        if (previewState === 'loading') return;
        generateSurveyAnswerLog(previewState.replace('reloading ', '') as SurveyAnswerLogPreviewPreviewState, props.badgeConfigurations, currentDate).then(surveyAnswerLog => {
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
    }, [], [props.previewState, props.surveyName, props.badgeConfigurations, currentDate]);

    if (!initialized && loading) return null;

    const onEnterLog = (): void => {
        if (props.previewState || loading) return;
        setLoading(true);
        enterSurveyAnswerLog(props.surveyName, currentDate);
    };

    return <div className="mdhui-sa-log-preview" ref={props.innerRef}>
        {(!surveyAnswerLog || !props.badgeConfigurations) &&
            <Card>
                <Action
                    title={isSameDay(currentDate, new Date()) ? 'Today\'s Log' : formatDateForLocale(currentDate, 'PPP')}
                    subtitle={surveyAnswerLog ? 'A log has been entered' : 'A log has not been entered.'}
                    renderAs="div"
                    indicator={loading
                        ? <LoadingIndicator className="mdhui-sa-log-preview-loading-indicator" />
                        : <Button className="mdhui-sa-log-preview-edit-button" onClick={onEnterLog}>{surveyAnswerLog ? 'Edit Log' : 'Add Log'}</Button>
                    }
                />
            </Card>
        }
        {surveyAnswerLog && props.badgeConfigurations &&
            <Card>
                <SurveyAnswerLogSummary
                    title={isSameDay(surveyAnswerLog.date, new Date()) ? 'Today\'s Log' : undefined}
                    surveyAnswerLog={surveyAnswerLog}
                    onEdit={onEnterLog}
                    badgeConfigurations={props.badgeConfigurations}
                    showFirstBadgeDetailsOnLoad={props.showFirstBadgeDetailsOnLoad}
                    alwaysShowBadgeDetails={props.alwaysShowBadgeDetails}
                    loading={loading}
                />
            </Card>
        }
    </div>;
}