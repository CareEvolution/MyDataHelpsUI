import { Card, SurveyLogBadgeContext, SurveyLogSummary, TextBlock } from '../index';
import React, { useContext } from 'react';
import { compareDesc, isAfter } from 'date-fns';
import { SurveyLog } from '../../../helpers';
import './SurveyLogList.css';
import { SurveyLogContext } from '../../container';

export interface SurveyLogListProps {
    shouldRender?: (surveyLog: SurveyLog) => boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogList(props: SurveyLogListProps) {
    const surveyLogContext = useContext(SurveyLogContext);
    const surveyLogBadgeContext = useContext(SurveyLogBadgeContext);

    if (!surveyLogContext) {
        return <TextBlock innerRef={props.innerRef}>Error: SurveyLogCalendar must be used within a SurveyLogCoordinator.</TextBlock>;
    }

    const surveyLogs = Object.values(surveyLogContext.surveyLogs as Record<string, SurveyLog>);

    return <div className="mdhui-survey-log-list" ref={props.innerRef}>
        {surveyLogs
            .filter(surveyLog => props.shouldRender ? props.shouldRender(surveyLog) : !isAfter(surveyLog.date, new Date()))
            .sort((a, b) => compareDesc(a.date, b.date))
            .map((surveyLog, index) => {
                return <Card key={index}>
                    <SurveyLogSummary
                        logSurveyName={surveyLogContext.logSurveyName}
                        onEnterLog={() => surveyLogContext.enterSurveyLog(surveyLog.date)}
                        badgeConfigurations={surveyLogBadgeContext?.badgeConfigurations}
                        getDetails={surveyLogBadgeContext?.getDetails}
                        surveyLog={surveyLog}
                        loading={surveyLogContext.loading}
                    />
                </Card>;
            })}
    </div>;
}