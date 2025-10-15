import React, { useContext, useMemo } from 'react';
import { Action, Button, Card, DateRangeContext, LoadingIndicator, TextBlock } from '../index';
import { isToday, startOfToday } from 'date-fns';
import { formatDateForLocale, getDayKey } from '../../../helpers';
import './SurveyLogPreview.css';
import { SurveyLogContext } from '../../container';
import SurveyLogSummary from '../SurveyLogSummary';

export interface SurveyLogPreviewProps {
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogPreview(props: SurveyLogPreviewProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const surveyLogContext = useContext(SurveyLogContext);

    if (!surveyLogContext) {
        return <TextBlock innerRef={props.innerRef}>Error: SurveyLogPreview must be used within a SurveyLogCoordinator.</TextBlock>;
    }

    const currentDate = useMemo<Date>(
        () => dateRangeContext?.intervalStart ?? startOfToday(),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    if (surveyLogContext.loading && surveyLogContext.firstTimeLoading) return null;

    const surveyLog = surveyLogContext.surveyLogs[getDayKey(currentDate)];

    const onEnterLog = (): void => {
        surveyLogContext.enterSurveyLog(currentDate);
    };

    return <div className="mdhui-survey-log-preview" ref={props.innerRef}>
        <Card>
            {!surveyLog &&
                <Action
                    title={isToday(currentDate) ? 'Today\'s Log' : formatDateForLocale(currentDate, 'PPP')}
                    subtitle="A log has not been entered."
                    renderAs="div"
                    indicator={surveyLogContext.loading
                        ? <LoadingIndicator className="mdhui-survey-log-preview-loading-indicator" />
                        : <Button className="mdhui-survey-log-preview-edit-button" onClick={onEnterLog}>Add Log</Button>
                    }
                />
            }
            {surveyLog &&
                <SurveyLogSummary
                    title={isToday(currentDate) ? 'Today\'s Log' : undefined}
                    surveyLog={surveyLog}
                    onEdit={onEnterLog}
                    loading={surveyLogContext.loading}
                />
            }
        </Card>
    </div>;
}