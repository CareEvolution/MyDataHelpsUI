import { Card, SurveyLogSummary, TextBlock } from '../index';
import React, { useContext } from 'react';
import { compareDesc } from 'date-fns';
import { SurveyLog } from '../../../helpers';
import './SurveyLogList.css';
import { SurveyLogContext } from '../../container';

export interface SurveyLogCalendarProps {
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogList(props: SurveyLogCalendarProps) {
    const surveyLogContext = useContext(SurveyLogContext);

    if (!surveyLogContext) {
        return <TextBlock innerRef={props.innerRef}>Error: SurveyLogCalendar must be used within a SurveyLogCoordinator.</TextBlock>;
    }

    const surveyLogs = Object.values(surveyLogContext.surveyLogs as Record<string, SurveyLog>);

    return <div className="mdhui-survey-log-list" ref={props.innerRef}>
        {surveyLogs.sort((a, b) => compareDesc(a.date, b.date)).map((surveyLog, index) => {
            return <Card key={index}>
                <SurveyLogSummary
                    surveyLog={surveyLog}
                    onEdit={() => surveyLogContext.enterSurveyLog(surveyLog.date)}
                    loading={surveyLogContext.loading}
                />
            </Card>;
        })}
    </div>;
}