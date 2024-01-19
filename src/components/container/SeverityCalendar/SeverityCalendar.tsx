import { useContext, useState } from "react";
import { Guid, SurveyAnswer, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import React from "react";
import queryAllSurveyAnswers from "../../../helpers/query-all-survey-answers";
import Calendar from "../../presentational/Calendar/Calendar";
import { format, parseISO, startOfDay, startOfMonth } from "date-fns";
import { CalendarDay, CalendarDayStateConfiguration, DateRangeContext, LoadingIndicator } from "../../presentational";
import { previewSeverityData } from "./SeverityCalendar.previewdata";
import { useInitializeView } from "../../../helpers/Initialization";
import "./SeverityCalendar.css";

export type SeverityCalendarPreviewState = "Default" | "NoData";

export interface SeverityCalendarProps {
    surveyName: string,
    dateRecordedResultIdentifier?: string,
    severityResultIdentifier: string,
    severityValueMapper?: (value: string) => string,
    intervalStart?: Date,
    previewState?: SeverityCalendarPreviewState,
    innerRef?: React.Ref<HTMLDivElement>
}

interface SeverityLogEntry {
    dateObserved: Date,
    severity: string,
    dateEntered: string
}

export default function (props: SeverityCalendarProps) {
    const surveyAnswerQuery: SurveyAnswersQuery = {
        surveyName: props.surveyName,
        resultIdentifier: props.dateRecordedResultIdentifier ? [props.dateRecordedResultIdentifier, props.severityResultIdentifier] : [props.severityResultIdentifier]
    };

    const [data, setData] = useState<Map<string, SeverityLogEntry> | undefined>();
    const dateRangeContext = useContext(DateRangeContext);
    let intervalStart = dateRangeContext?.intervalStart ?? props.intervalStart ?? startOfMonth(new Date());

    async function initialize() {
        if (props.previewState) {
            transformToCalendarData(props.previewState === "Default" ? previewSeverityData : []);
        } else {
            queryAllSurveyAnswers(surveyAnswerQuery).then((results: SurveyAnswer[]) => {
                transformToCalendarData(results);
            });
        }
    }

    function transformToCalendarData(results: SurveyAnswer[]) {

        var resultByDateMap = new Map<string, SeverityLogEntry>();
        var groupedByResult = groupAnswersByResult(results);
        const ceSeverityValueMapper = function (severityAnswer: string) {
            let severity = "";
            if (['mild', 'moderate', 'severe'].includes(severityAnswer.toLowerCase())) {
                severity = severityAnswer.toLowerCase();
            }
            return severity;
        };

        const severityValueMapper = props.severityValueMapper ?? ceSeverityValueMapper;
        groupedByResult.forEach((grouping) => {
            if (grouping.severityAnswer) {
                var severity = severityValueMapper(grouping.severityAnswer.answers[0]);
                if (severity) {
                    let dateOfSeverity = parseISO(grouping.dateObservedAnswer ? grouping.dateObservedAnswer.answers[0] : grouping.severityAnswer.date);
                    let key = format(startOfDay(dateOfSeverity), 'MM/dd/yyyy');
                    let exists = resultByDateMap.get(key);
                    if (exists) {
                        if (grouping.severityAnswer.date > exists.dateEntered) {
                            exists.dateObserved = dateOfSeverity;
                            exists.severity = severity;
                            exists.dateEntered = grouping.severityAnswer.date;
                        }
                    } else {
                        resultByDateMap.set(key, { dateObserved: dateOfSeverity, severity: severity, dateEntered: grouping.severityAnswer.date });
                    }
                }
            }
        });

        setData(resultByDateMap);
    }

    function groupAnswersByResult(results: SurveyAnswer[]) {
        var groupedByResult = new Map<Guid, { dateObservedAnswer?: SurveyAnswer, severityAnswer?: SurveyAnswer }>();

        results.forEach((r) => {
            var exists = groupedByResult.get(r.surveyResultID);
            var completeResult = exists ?? { dateObservedAnswer: undefined, severityAnswer: undefined };
            if (r.answers && r.answers[0] !== "") {
                if (r.resultIdentifier === props.severityResultIdentifier) {
                    completeResult.severityAnswer = r;
                } else if (r.resultIdentifier === props.dateRecordedResultIdentifier) {
                    completeResult.dateObservedAnswer = r;
                }

                groupedByResult.set(r.surveyResultID, completeResult);
            }
        })

        return groupedByResult;
    }

    const stateConfiguration: CalendarDayStateConfiguration = {
        'mild': {
            style: {
                background: '#F7DA19'
            },
            streak: true,
            streakColor: '#FDEF97'
        },
        'moderate': {
            style: {
                background: 'var(--mdhui-color-warning)'
            },
            streak: true,
            streakColor: '#FCCCC7'
        },
        'severe': {
            style: {
                background: 'var(--mdhui-color-danger)'
            },
            streak: true,
            streakColor: '#FCCCC7'
        },
    };

    const computeStateForDay = (date: Date): string => {
        let key: string = format(startOfDay(date), 'MM/dd/yyyy');
        return data?.get(key)?.severity ?? "";
    };

    const renderDay = (year: number, month: number, day?: number): React.JSX.Element => {
        return <CalendarDay
            year={year}
            month={month}
            day={day}
            stateConfiguration={stateConfiguration}
            computeStateForDay={computeStateForDay}
        />;
    };

    useInitializeView(initialize, [], [props.previewState]);

    if (!data) {
        return <LoadingIndicator innerRef={props.innerRef} />;
    } else {
        return (<>
            {dateRangeContext && dateRangeContext?.intervalType !== "Month" && 
                <div className="mdhui-severity-calendar-date-interval-not-supported" ref={props.innerRef}>Severity calendar does not support week view at this time</div>}
            {(!dateRangeContext || dateRangeContext?.intervalType === "Month") && 
                <Calendar innerRef={props.innerRef} className="mdhui-simple-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
            }
        </>);
    }
}