import React, { useContext, useMemo } from 'react';
import { Card, DateRangeContext, SurveyLogBadgeContext, TextBlock } from '../index';
import { isToday, startOfToday } from 'date-fns';
import { getDayKey } from '../../../helpers';
import { SurveyLogContext } from '../../container';
import SurveyLogSummary from '../SurveyLogSummary';

export interface SurveyLogPreviewProps {
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogPreview(props: SurveyLogPreviewProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const surveyLogContext = useContext(SurveyLogContext);
    const surveyLogBadgeContext = useContext(SurveyLogBadgeContext);

    if (!surveyLogContext) {
        return <TextBlock innerRef={props.innerRef}>Error: SurveyLogPreview must be used within a SurveyLogCoordinator.</TextBlock>;
    }

    const currentDate = useMemo<Date>(
        () => dateRangeContext?.intervalStart ?? startOfToday(),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    if (surveyLogContext.loading && surveyLogContext.firstTimeLoading) return null;

    const surveyLog = surveyLogContext.surveyLogs[getDayKey(currentDate)];
    if (!surveyLog) return null;

    const onEnterLog = (): void => {
        surveyLogContext.enterSurveyLog(currentDate);
    };

    return <div className="mdhui-survey-log-preview" ref={props.innerRef}>
        <Card>
            <SurveyLogSummary
                title={isToday(currentDate) ? 'Today' : undefined}
                logSurveyName={surveyLogContext.logSurveyName}
                onEnterLog={onEnterLog}
                badgeConfigurations={surveyLogBadgeContext?.badgeConfigurations}
                getDetails={surveyLogBadgeContext?.getDetails}
                surveyLog={surveyLog}
                loading={surveyLogContext.loading}
            />
        </Card>
    </div>;
}